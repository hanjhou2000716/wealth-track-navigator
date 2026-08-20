import { getAppMode, providerUnavailableMessage } from "../../settings";
import { demoProfile } from "../../demo-data";
import { buildDemoTrajectory } from "../../trajectory";

export async function GET() {
  const mode = getAppMode();
  if (mode === "production") return Response.json({ mode, transitions: [], sampleSize: 0, unavailable: providerUnavailableMessage(mode) });
  const transitions = buildDemoTrajectory(demoProfile);
  return Response.json({ mode, transitions, sampleSize: transitions.reduce((max, item) => Math.max(max, item.sampleSize), 0), evidence: "DEMO DATA — 3 seeded transitions; insufficient for market-level inference" });
}
