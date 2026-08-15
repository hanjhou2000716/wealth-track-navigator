import { calculateCompensation, formatCompensation } from "../../compensation";
import { buildGapMatrix } from "../../gap-matrix";

export async function GET() {
  const gaps = buildGapMatrix({ Experience: 58, TechnicalDepth: 71, Scope: 48, Leadership: 42, Impact: 45, CrossFunctional: 63 }, { Experience: 70, TechnicalDepth: 75, Scope: 75, Leadership: 68, Impact: 70, CrossFunctional: 72 });
  const compensation = calculateCompensation({ base: 1080000, annualBonusRate: 0.12, equity: 600000, vesting: [0.25, 0.25, 0.25, 0.25], signOn: 150000, region: "TW", currency: "NTD" });
  return Response.json({ mode: "demo", horizons: [{ horizon: "90 days", actions: [gaps[0].nextAction, gaps[1].nextAction] }, { horizon: "6 months", actions: ["Ship a quantified portfolio case study", "Request target-role calibration"] }, { horizon: "12 months", actions: ["Apply to WT-IC3 product design roles"] }], gaps, compensation: { fourYearTotal: formatCompensation(compensation.fourYearTotal, "NTD"), realIndex: compensation.realIndex, evidence: "DEMO DATA" } });
}
