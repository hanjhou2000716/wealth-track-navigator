import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const files = [
  "app", "config", "db", "docs", "tests", "types", "worker", "README.md",
  "package.json", ".github/workflows/ci.yml",
];
const extensions = new Set([".js", ".mjs", ".ts", ".tsx", ".json", ".md", ".yml", ".yaml"]);
const secretPatterns = [
  { name: "private key", pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: "OpenAI-style API key", pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
  { name: "public frontend secret key", pattern: /NEXT_PUBLIC_[A-Z0-9_]*(?:KEY|TOKEN|SECRET|PASSWORD)/ },
  { name: "common bearer token literal", pattern: /Authorization\s*:\s*Bearer\s+[A-Za-z0-9._~-]{24,}/i },
];

async function walk(relative) {
  const absolute = join(root, relative);
  const entries = await (await import("node:fs/promises")).readdir(absolute, { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    const child = join(relative, entry.name);
    if (entry.isDirectory()) found.push(...await walk(child));
    else if (extensions.has(entry.name.slice(entry.name.lastIndexOf(".")))) found.push(child);
  }
  return found;
}

const candidates = [];
for (const path of files) {
  try {
    const stat = await (await import("node:fs/promises")).stat(join(root, path));
    candidates.push(...(stat.isDirectory() ? await walk(path) : [path]));
  } catch {
    // Optional paths are skipped; the CI checkout still scans every existing source path.
  }
}

const findings = [];
for (const path of candidates) {
  const text = await readFile(join(root, path), "utf8");
  for (const rule of secretPatterns) {
    if (rule.pattern.test(text)) findings.push(`${rule.name}: ${path}`);
  }
}

if (findings.length) {
  console.error(findings.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`security scan passed: ${candidates.length} source files inspected`);
}
