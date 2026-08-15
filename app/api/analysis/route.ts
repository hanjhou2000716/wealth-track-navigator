import { demoProfile } from "../../demo-data";
import { calculateCareerCapital, calculateConfidenceBreakdown, calculateWealthTrackScore, DEMO_EVIDENCE, gateClaim, normalizeLevel } from "../../domain";
import { getAppMode } from "../../settings";

export async function GET() {
  const mode = getAppMode();
  const capital = calculateCareerCapital(demoProfile);
  const leveling = normalizeLevel({ roleFamily: "Mechanical", scope: 61, impact: 55, leadership: 42, autonomy: 63 });
  const score = calculateWealthTrackScore({ careerCapital: capital.total, marketValue: 78, levelReadiness: 64, mobility: 72, compUpside: 71 });
  const claims = [gateClaim({ text: "Profile supplied by the user", kind: "FACT", evidence: [DEMO_EVIDENCE] }), gateClaim({ text: "Next-level scope is the highest-leverage gap", kind: "RECOMMENDATION", evidence: [DEMO_EVIDENCE] })];
  return Response.json({ mode, profile: demoProfile, capital, leveling, score, claims: mode === "demo" ? claims : [], trust: mode === "demo" ? { breakdown: calculateConfidenceBreakdown([DEMO_EVIDENCE]), source: DEMO_EVIDENCE.sourceProvider, sourceTier: DEMO_EVIDENCE.sourceTier, freshness: DEMO_EVIDENCE.freshness } : null, generatedAt: new Date().toISOString() });
}
