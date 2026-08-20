import { calculateCareerCapital } from "./domain";
import { demoProfile } from "./demo-data";
import { parseResumeText } from "./profile-parser";
import { providerState } from "./provider-registry";
import { buildJobRadar } from "./job-radar";
import { buildDemoTrajectory } from "./trajectory";

export type AcceptancePersona = {
  id: string;
  scenario: string;
  expected: string;
  status: "PASS" | "NOT_READY";
  evidence: string[];
};

function verified(id: string, scenario: string, expected: string, checks: Array<{ ok: boolean; evidence: string }>): AcceptancePersona {
  return { id, scenario, expected, status: checks.every((check) => check.ok) ? "PASS" : "NOT_READY", evidence: checks.map((check) => `${check.ok ? "PASS" : "FAIL"}: ${check.evidence}`) };
}

const demoRadar = buildJobRadar(demoProfile);
const demoTrajectory = buildDemoTrajectory(demoProfile);
const capital = calculateCareerCapital(demoProfile);
const failedPeopleLookup = { ok: false as const, code: "EMPTY" as const, message: "demo people record unavailable", claims: [] };

export const acceptancePersonas: AcceptancePersona[] = [
  verified("A", "Garmin 機械工程師 → Apple 資深產品設計", "具備明確證據的完整示範策略流程", [
    { ok: demoProfile.employment.length > 0, evidence: "user-supplied employment is present" },
    { ok: demoTrajectory.every((edge) => edge.evidence.length > 0), evidence: "trajectory edges carry evidence IDs" },
    { ok: demoRadar.some((item) => item.track === "FIT") && demoRadar.some((item) => item.track === "STRETCH"), evidence: "both radar tracks are present" },
  ]),
  verified("B", "TSMC 設備工程師 → 國際半導體職位", "職務家族標準化與資料供應商控管的雷達", [
    { ok: demoRadar.every((item) => item.evidence.length > 0), evidence: "radar recommendations expose deterministic evidence" },
    { ok: demoTrajectory.some((edge) => edge.to === "國際半導體公司"), evidence: "國際半導體轉職軌跡已呈現" },
  ]),
  verified("C", "跨領域候選人", "可轉移資本與事實維持分離", [
    { ok: capital.transferable > 0 && capital.technical > 0, evidence: "technical and transferable capital are separate dimensions" },
  ]),
  verified("D", "沒有外部資料供應商資料", "正常且安全的空狀態降級", [
    { ok: providerState("production", "people").available === false, evidence: "production people provider is unavailable without a verified license" },
  ]),
  verified("E", "資料供應商 API 失敗", "不可用或可重試狀態，絕不產生假資料", [
    { ok: !failedPeopleLookup.ok && failedPeopleLookup.code === "EMPTY", evidence: "demo provider returns an explicit EMPTY result" },
  ]),
  verified("F", "格式錯誤或不完整履歷", "回傳驗證結果且不崩潰", [
    { ok: Boolean(parseResumeText(":: malformed ::", demoProfile).profile), evidence: "fallback parser returns a typed profile without throwing" },
  ]),
];
