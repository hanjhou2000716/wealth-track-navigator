import { parseResumeText } from "../../../profile-parser";
import { extractDocxText, extractPdfText, resolveProfileUrl, validateIngestionText, type ProfileInputKind } from "../../../profile-ingestion";
import { demoProfile } from "../../../demo-data";
import { getAppMode } from "../../../settings";

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData().catch(() => null);
    const file = form?.get("file");
    if (!(file instanceof File)) return Response.json({ error: "file is required" }, { status: 400 });
    if (file.size > MAX_BYTES) return Response.json({ error: "file exceeds the 8 MB limit" }, { status: 413 });
    const name = file.name.toLowerCase();
    const kind: ProfileInputKind = name.endsWith(".pdf") ? "pdf" : name.endsWith(".docx") ? "docx" : "text";
    if (kind === "text") {
      const text = await file.text();
      const failure = validateIngestionText(text);
      if (failure) return Response.json({ error: failure.message, code: failure.code }, { status: 400 });
      return Response.json({ mode: "demo", kind, originalText: text, ...parseResumeText(text, demoProfile) });
    }
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const text = kind === "pdf" ? extractPdfText(bytes) : extractDocxText(bytes);
      const failure = validateIngestionText(text);
      if (failure) return Response.json({ error: failure.message, code: failure.code }, { status: 422 });
      return Response.json({ mode: "demo", kind, originalText: text, ...parseResumeText(text, demoProfile) });
    } catch {
      return Response.json({ error: "無法解析此檔案，請確認格式或改用貼上文字", code: "MALFORMED" }, { status: 422 });
    }
  }

  const body = await request.json().catch(() => null) as { kind?: unknown; text?: unknown; url?: unknown } | null;
  const kind = body?.kind === "url" ? "url" : "text";
  if (kind === "url") {
    const failure = resolveProfileUrl(typeof body?.url === "string" ? body.url : "", getAppMode());
    return Response.json({ error: failure.message, code: failure.code, mode: getAppMode() }, { status: failure.code === "MALFORMED" ? 400 : 503 });
  }
  const text = typeof body?.text === "string" ? body.text : "";
  const failure = validateIngestionText(text);
  if (failure) return Response.json({ error: failure.message, code: failure.code }, { status: 400 });
  if (text.length > 20000) return Response.json({ error: "resume text exceeds the 20,000 character limit", code: "TOO_LARGE" }, { status: 413 });
  return Response.json({ mode: "demo", kind, originalText: text, ...parseResumeText(text, demoProfile) });
}
