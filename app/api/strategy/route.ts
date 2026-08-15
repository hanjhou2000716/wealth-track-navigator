import { calculateCompensation, formatCompensation } from "../../compensation";
import { buildGapMatrix } from "../../gap-matrix";
import { getAppMode, providerUnavailableMessage } from "../../settings";

export async function GET() {
  const mode = getAppMode();
  if (mode === "production") {
    return Response.json({ mode, horizons: [], gaps: [], compensation: null, unavailable: providerUnavailableMessage(mode) });
  }
  const gaps = buildGapMatrix({ Experience: 58, TechnicalDepth: 71, Scope: 48, Leadership: 42, Impact: 45, CrossFunctional: 63 }, { Experience: 70, TechnicalDepth: 75, Scope: 75, Leadership: 68, Impact: 70, CrossFunctional: 72 });
  const compensation = calculateCompensation({ base: 1080000, annualBonusRate: 0.12, equity: 600000, vesting: [0.25, 0.25, 0.25, 0.25], signOn: 150000, region: "TW", currency: "NTD" });
  return Response.json({ mode, horizons: [{ horizon: "90 天", actions: [gaps[0].nextAction, gaps[1].nextAction] }, { horizon: "6 個月", actions: ["完成一份量化作品集案例", "取得目標職位校準"] }, { horizon: "12 個月", actions: ["申請 WT-IC3 產品設計職位"] }], gaps, compensation: { fourYearTotal: formatCompensation(compensation.fourYearTotal, "NTD"), realIndex: compensation.realIndex, evidence: "示範資料" } });
}
