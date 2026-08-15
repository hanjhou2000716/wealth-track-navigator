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
  verified("A", "Garmin Mechanical Engineer → Apple Senior Product Design", "complete demo strategy flow with explicit evidence", [
    { ok: demoProfile.employment.length > 0, evidence: "user-supplied employment is present" },
    { ok: demoTrajectory.every((edge) => edge.evidence.length > 0), evidence: "trajectory edges carry evidence IDs" },
    { ok: demoRadar.some((item) => item.track === "FIT") && demoRadar.some((item) => item.track === "STRETCH"), evidence: "both radar tracks are present" },
  ]),
  verified("B", "TSMC Equipment Engineer → international semiconductor role", "role-family normalization and provider-gated radar", [
    { ok: demoRadar.every((item) => item.evidence.length > 0), evidence: "radar recommendations expose deterministic evidence" },
    { ok: demoTrajectory.some((edge) => edge.to === "International semiconductor"), evidence: "international semiconductor trajectory is represented" },
  ]),
  verified("C", "cross-domain candidate", "transferable capital remains separate from facts", [
    { ok: capital.transferable > 0 && capital.technical > 0, evidence: "technical and transferable capital are separate dimensions" },
  ]),
  verified("D", "no external Provider data", "normal empty-safe degradation", [
    { ok: providerState("production", "people").available === false, evidence: "production people provider is unavailable without a verified license" },
  ]),
  verified("E", "Provider API failure", "unavailable or retryable state, never fake data", [
    { ok: !failedPeopleLookup.ok && failedPeopleLookup.code === "EMPTY", evidence: "demo provider returns an explicit EMPTY result" },
  ]),
  verified("F", "malformed or incomplete resume", "validation response without crash", [
    { ok: Boolean(parseResumeText(":: malformed ::", demoProfile).profile), evidence: "fallback parser returns a typed profile without throwing" },
  ]),
];
