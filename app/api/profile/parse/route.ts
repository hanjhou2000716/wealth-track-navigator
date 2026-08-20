import { demoProfile } from "../../../demo-data";
import { parseResumeText } from "../../../profile-parser";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { text?: unknown } | null;
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text) return Response.json({ error: "resume text is required" }, { status: 400 });
  if (text.length > 20000) return Response.json({ error: "resume text exceeds the 20,000 character limit" }, { status: 413 });
  return Response.json({ mode: "demo", originalText: text, ...parseResumeText(text, demoProfile) });
}
