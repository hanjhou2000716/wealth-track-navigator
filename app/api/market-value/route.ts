import { demoProfile } from "../../demo-data";
import { calculateMarketValue } from "../../market-value";
import { getAppMode, providerUnavailableMessage } from "../../settings";

export async function GET() {
  const mode = getAppMode();
  if (mode === "production") return Response.json({ mode, marketValue: null, unavailable: providerUnavailableMessage(mode) });
  return Response.json({ mode, marketValue: calculateMarketValue(demoProfile), evidence: "DEMO DATA — no external market provider connected" });
}
