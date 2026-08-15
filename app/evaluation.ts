import { blindLevel, type CareerTrack, type LevelEvidence, type WealthTrackLevel } from "./leveling";

export type LevelEvaluationCase = {
  id: string;
  track: CareerTrack;
  expected: WealthTrackLevel;
  evidence: LevelEvidence;
};

const dimensions: (keyof LevelEvidence)[] = [
  "scope", "complexity", "autonomy", "impact", "leadership",
  "crossFunctional", "decisionRights", "stakeholderScope", "businessOwnership", "mentorship",
];

function evidenceFor(level: number, seed: number): LevelEvidence {
  const values = Object.fromEntries(dimensions.map((dimension, index) => {
    const variation = ((seed * (index + 3)) % 7) - 3;
    return [dimension, Math.max(0, Math.min(100, level + variation))];
  }));
  return values as LevelEvidence;
}

export function buildEvaluationCorpus(size = 300): LevelEvaluationCase[] {
  return Array.from({ length: size }, (_, index) => {
    const level = 2 + (index % 5);
    const track: CareerTrack = index % 2 === 0 ? "IC" : "MANAGEMENT";
    const targetIndex = track === "IC" ? level : Math.max(1, level - 1);
    return {
      id: `WT-${String(index + 1).padStart(3, "0")}`,
      track,
      expected: `${track === "IC" ? "WT-IC" : "WT-M"}${targetIndex}` as WealthTrackLevel,
      evidence: evidenceFor(level === 2 ? 36 : level === 3 ? 53 : level === 4 ? 69 : level === 5 ? 82 : 94, index + 11),
    };
  });
}

export function evaluateLeveling(cases = buildEvaluationCorpus()) {
  const results = cases.map((item) => ({ ...item, predicted: blindLevel(item.evidence, item.track).level }));
  const exact = results.filter((item) => item.predicted === item.expected).length;
  const distance = (a: string, b: string) => Math.abs(Number(a.replace(/[^0-9]/g, "")) - Number(b.replace(/[^0-9]/g, "")));
  const withinOne = results.filter((item) => distance(item.predicted, item.expected) <= 1).length;
  return {
    totalCases: results.length,
    exactLevel: exact,
    withinOneLevel: withinOne,
    exactRate: results.length ? Math.round((exact / results.length) * 100) : 0,
    withinOneRate: results.length ? Math.round((withinOne / results.length) * 100) : 0,
    unsupportedHighConfidence: results.filter((item) => blindLevel(item.evidence, item.track).confidence >= 90 && distance(item.predicted, item.expected) > 1).length,
    methodology: "blind-scope-evidence-v1",
  };
}
