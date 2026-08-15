export type SourceTier = "TIER_A_PRIMARY" | "TIER_B_LICENSED" | "TIER_C_AGGREGATED" | "TIER_D_INFERENCE";
export type ClaimKind = "FACT" | "INFERENCE" | "RECOMMENDATION" | "UNKNOWN";
export type FreshnessStatus = "FRESH" | "AGING" | "STALE" | "UNKNOWN";

export type Evidence = {
  sourceProvider: string;
  sourceType: string;
  sourceRecordId?: string;
  sourceReference?: string;
  retrievedAt: string;
  observedAt?: string;
  sourceTier: SourceTier;
  freshness: FreshnessStatus;
  confidence: number;
};

export type TrustClaim = {
  text: string;
  kind: ClaimKind;
  evidence: Evidence[];
  confidence: number;
};

export type Employment = {
  company: string;
  role: string;
  startedAt: string;
  endedAt?: string;
  scope?: string;
  impact?: string;
};

export type Profile = {
  name: string;
  location: string;
  summary: string;
  skills: string[];
  employment: Employment[];
  education: string[];
  projects: string[];
  languages: string[];
  certificates: string[];
};

export const DEMO_EVIDENCE: Evidence = {
  sourceProvider: "user-demo-profile",
  sourceType: "demo_resume",
  sourceReference: "demo://garmin-mechanical-engineer",
  retrievedAt: "2026-08-15T00:00:00.000Z",
  sourceTier: "TIER_A_PRIMARY",
  freshness: "FRESH",
  confidence: 1,
};

export function freshnessFromAge(ageDays: number, freshDays = 30, agingDays = 90): FreshnessStatus {
  if (!Number.isFinite(ageDays) || ageDays < 0) return "UNKNOWN";
  if (ageDays <= freshDays) return "FRESH";
  if (ageDays <= agingDays) return "AGING";
  return "STALE";
}

export type ConfidenceBreakdown = { sourceReliability: number; freshness: number; evidenceCoverage: number; crossSourceAgreement: number; score: number };

export function calculateConfidenceBreakdown(evidence: Evidence[]): ConfidenceBreakdown {
  if (evidence.length === 0) return { sourceReliability: 0, freshness: 0, evidenceCoverage: 0, crossSourceAgreement: 0, score: 0 };
  const tierWeight: Record<SourceTier, number> = {
    TIER_A_PRIMARY: 1,
    TIER_B_LICENSED: 0.92,
    TIER_C_AGGREGATED: 0.72,
    TIER_D_INFERENCE: 0.35,
  };
  const freshnessWeight: Record<FreshnessStatus, number> = { FRESH: 1, AGING: 0.82, STALE: 0.55, UNKNOWN: 0.35 };
  const sourceReliability = evidence.reduce((sum, item) => sum + tierWeight[item.sourceTier] * Math.max(0, Math.min(1, item.confidence)), 0) / evidence.length;
  const freshness = evidence.reduce((sum, item) => sum + freshnessWeight[item.freshness], 0) / evidence.length;
  const evidenceCoverage = Math.min(1, 0.75 + evidence.length * 0.125);
  const uniqueProviders = new Set(evidence.map((item) => item.sourceProvider)).size;
  const crossSourceAgreement = uniqueProviders > 1 ? 1 : 0.85;
  const score = sourceReliability * freshness * evidenceCoverage * crossSourceAgreement;
  return { sourceReliability: Math.round(sourceReliability * 100), freshness: Math.round(freshness * 100), evidenceCoverage: Math.round(evidenceCoverage * 100), crossSourceAgreement: Math.round(crossSourceAgreement * 100), score: Math.round(score * 100) };
}

export function calculateConfidence(evidence: Evidence[]): number {
  return calculateConfidenceBreakdown(evidence).score;
}

export function gateClaim(claim: Omit<TrustClaim, "confidence">): TrustClaim {
  const confidence = calculateConfidence(claim.evidence);
  const kind = claim.kind === "FACT" && claim.evidence.length === 0 ? "UNKNOWN" : claim.kind;
  return { ...claim, kind, confidence };
}

export function calculateCareerCapital(profile: Profile): { technical: number; transferable: number; scope: number; total: number } {
  const technical = Math.min(100, profile.skills.length * 11 + profile.certificates.length * 5);
  const transferable = Math.min(100, profile.languages.length * 10 + profile.projects.length * 12 + profile.employment.length * 8);
  const scope = Math.min(100, profile.employment.reduce((sum, item) => sum + (item.scope ? 16 : 4) + (item.impact ? 14 : 0), 0));
  const total = Math.round(technical * 0.4 + transferable * 0.3 + scope * 0.3);
  return { technical, transferable, scope, total };
}

export function calculateWealthTrackScore(input: { careerCapital: number; marketValue: number; levelReadiness: number; mobility: number; compUpside: number }): number {
  return Math.round(input.careerCapital * 0.28 + input.marketValue * 0.22 + input.levelReadiness * 0.2 + input.mobility * 0.15 + input.compUpside * 0.15);
}

export function normalizeLevel(input: { roleFamily: string; scope: number; impact: number; leadership: number; autonomy: number }): { level: string; confidence: number } {
  const score = input.scope * 0.3 + input.impact * 0.25 + input.leadership * 0.2 + input.autonomy * 0.25;
  const level = score >= 82 ? "WT-IC4" : score >= 65 ? "WT-IC3" : score >= 45 ? "WT-IC2" : "WT-IC1";
  return { level, confidence: Math.round(Math.min(0.96, 0.45 + score / 200) * 100) };
}
