import { getAppMode, providerUnavailableMessage } from "../../settings";
import { demoProfile } from "../../demo-data";
import { buildJobRadar } from "../../job-radar";

export async function GET() {
  const mode = getAppMode();
  if (mode === "production") return Response.json({ mode, items: [], unavailable: providerUnavailableMessage(mode) });
  return Response.json({ mode, items: buildJobRadar(demoProfile), evidence: "DEMO DATA — no external job provider connected" });
}
