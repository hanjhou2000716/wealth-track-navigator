import { inflateRawSync } from "node:zlib";

export type ProfileInputKind = "text" | "pdf" | "docx" | "url";
export type ProfileIngestionResult = { kind: ProfileInputKind; text: string; source: "user-supplied"; warnings: string[] };
export type ProfileIngestionFailure = { kind: ProfileInputKind; code: "MALFORMED" | "UNSUPPORTED" | "EMPTY"; message: string };

function decode(bytes: Uint8Array): string { return new TextDecoder("utf-8", { fatal: false }).decode(bytes); }

function readU16(view: DataView, offset: number): number { return view.getUint16(offset, true); }
function readU32(view: DataView, offset: number): number { return view.getUint32(offset, true); }

function zipEntry(bytes: Uint8Array, wanted: string): Uint8Array | null {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let end = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i -= 1) {
    if (readU32(view, i) === 0x06054b50) { end = i; break; }
  }
  if (end < 0) return null;
  const directorySize = readU32(view, end + 12);
  const directoryOffset = readU32(view, end + 16);
  let cursor = directoryOffset;
  const limit = directoryOffset + directorySize;
  while (cursor < limit && readU32(view, cursor) === 0x02014b50) {
    const compression = readU16(view, cursor + 10);
    const compressedSize = readU32(view, cursor + 20);
    const nameLength = readU16(view, cursor + 28);
    const extraLength = readU16(view, cursor + 30);
    const commentLength = readU16(view, cursor + 32);
    const localOffset = readU32(view, cursor + 42);
    const name = decode(bytes.slice(cursor + 46, cursor + 46 + nameLength));
    if (name === wanted) {
      if (readU32(view, localOffset) !== 0x04034b50) return null;
      const localNameLength = readU16(view, localOffset + 26);
      const localExtraLength = readU16(view, localOffset + 28);
      const start = localOffset + 30 + localNameLength + localExtraLength;
      const payload = bytes.slice(start, start + compressedSize);
      if (compression === 0) return payload;
      if (compression === 8) return new Uint8Array(inflateRawSync(payload));
      return null;
    }
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  return null;
}

function decodeXml(value: string): string {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/\s+/g, " ").trim();
}

export function extractDocxText(bytes: Uint8Array): string {
  const documentXml = zipEntry(bytes, "word/document.xml");
  if (!documentXml) throw new Error("DOCX document.xml is missing or unreadable");
  return decodeXml(decode(documentXml));
}

function decodePdfLiteral(value: string): string {
  return value.slice(1, -1).replace(/\\([\\()])/g, "$1").replace(/\\n/g, "\n").replace(/\\r/g, "\r");
}

export function extractPdfText(bytes: Uint8Array): string {
  const raw = decode(bytes);
  if (!raw.includes("%PDF-")) throw new Error("PDF header is missing");
  const parts: string[] = [];
  for (const block of raw.matchAll(/BT([\s\S]*?)ET/g)) {
    const content = block[1];
    for (const literal of content.matchAll(/\((?:\\.|[^)])*\)/g)) parts.push(decodePdfLiteral(literal[0]));
    for (const hex of content.matchAll(/<([0-9A-Fa-f\s]+)>/g)) {
      const clean = hex[1].replace(/\s/g, "");
      if (clean.length % 2 === 0) parts.push(decode(Uint8Array.from({ length: clean.length / 2 }, (_, i) => Number.parseInt(clean.slice(i * 2, i * 2 + 2), 16))));
    }
  }
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

export function resolveProfileUrl(value: string, mode: "demo" | "production" = "demo"): ProfileIngestionFailure {
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol)) throw new Error("unsupported protocol");
  } catch {
    return { kind: "url", code: "MALFORMED", message: "Profile URL 必須是有效的 HTTP(S) 網址" };
  }
  return { kind: "url", code: "UNSUPPORTED", message: mode === "production" ? "資料目前無法取得" : "Demo 模式不會抓取外部 Profile；請改用貼上文字或授權 Provider" };
}

export function validateIngestionText(text: string): ProfileIngestionFailure | null {
  return text.trim() ? null : { kind: "text", code: "EMPTY", message: "履歷內容不可為空白" };
}
