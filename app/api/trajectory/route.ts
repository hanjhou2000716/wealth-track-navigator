import { getAppMode, providerUnavailableMessage } from "../../settings";

export async function GET() {
  const mode = getAppMode();
  if (mode === "production") return Response.json({ mode, transitions: [], sampleSize: 0, unavailable: providerUnavailableMessage(mode) });
  return Response.json({ mode, transitions: [], sampleSize: 0, evidence: "DEMO DATA — licensed career-history provider required" });
}
