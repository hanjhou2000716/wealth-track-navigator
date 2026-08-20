export type CareerTrack = "IC" | "MANAGEMENT";
export type WealthTrackLevel = "WT-IC1" | "WT-IC2" | "WT-IC3" | "WT-IC4" | "WT-IC5" | "WT-IC6" | "WT-M1" | "WT-M2" | "WT-M3" | "WT-M4" | "WT-M5";

export const roleFamilies = ["Software", "Data", "AI / ML", "Mechanical", "Product Design", "Equipment", "Process", "Semiconductor", "Hardware", "Electrical", "Product Management", "Program Management", "Operations", "Supply Chain", "Sales", "Solution Engineering", "Finance"] as const;

export type LevelEvidence = { scope: number; complexity: number; autonomy: number; impact: number; leadership: number; crossFunctional: number; decisionRights: number; stakeholderScope: number; businessOwnership: number; mentorship: number };

export function blindLevel(evidence: LevelEvidence, track: CareerTrack = "IC"): { level: WealthTrackLevel; confidence: number; evidenceUsed: string[] } {
  const score = evidence.scope * 0.18 + evidence.complexity * 0.1 + evidence.autonomy * 0.12 + evidence.impact * 0.16 + evidence.leadership * 0.1 + evidence.crossFunctional * 0.08 + evidence.decisionRights * 0.1 + evidence.stakeholderScope * 0.06 + evidence.businessOwnership * 0.06 + evidence.mentorship * 0.04;
  const index = track === "IC"
    ? score >= 88 ? 6 : score >= 76 ? 5 : score >= 62 ? 4 : score >= 45 ? 3 : 2
    : score >= 88 ? 5 : score >= 76 ? 4 : score >= 62 ? 3 : score >= 45 ? 2 : 1;
  const level = `${track === "IC" ? "WT-IC" : "WT-M"}${index}` as WealthTrackLevel;
  return { level, confidence: Math.round(Math.min(0.98, 0.45 + score / 200) * 100), evidenceUsed: ["Scope", "Complexity", "Autonomy", "Impact", "Leadership", "Cross-functional", "Decision rights", "Stakeholder scope", "Business ownership", "Mentorship"] };
}

export function titleArbitrage(titleLevel: WealthTrackLevel, blind: WealthTrackLevel): number {
  const rank = (level: WealthTrackLevel) => Number(level.replace("WT-IC", "").replace("WT-M", ""));
  return rank(blind) - rank(titleLevel);
}
