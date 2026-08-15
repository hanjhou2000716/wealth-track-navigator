import { calculateCompensation, formatCompensation } from "../../compensation";
import { getAppMode, providerUnavailableMessage } from "../../settings";

export async function GET() {
  const mode = getAppMode();
  if (mode === "production") return Response.json({ mode, compensation: null, unavailable: providerUnavailableMessage(mode) });
  const input = { base: 1080000, annualBonusRate: 0.12, equity: 600000, vesting: [0.25, 0.25, 0.25, 0.25], signOn: 150000, region: "TW" as const, currency: "NTD" };
  const result = calculateCompensation(input);
  return Response.json({ mode, compensation: { ...result, fourYearTotalFormatted: formatCompensation(result.fourYearTotal, input.currency), colAdjustedTotalFormatted: result.colAdjustedTotal === null ? null : formatCompensation(result.colAdjustedTotal, input.currency), evidence: "DEMO DATA — compensation and COL provider not connected" } });
}
