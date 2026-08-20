import type { Profile } from "./domain";

export type MarketValue = { technicalCapital: number; impactEvidence: number; transferableCapital: number; scarcitySignal: number; score: number; evidence: string[] };

export function calculateMarketValue(profile: Profile): MarketValue {
  const technicalCapital = Math.min(100, profile.skills.length * 12 + profile.certificates.length * 5);
  const impactEvidence = Math.min(100, profile.employment.reduce((sum, item) => sum + (item.impact ? 24 : 8) + (item.scope ? 10 : 0), 0));
  const transferableCapital = Math.min(100, profile.projects.length * 16 + profile.languages.length * 12 + profile.employment.length * 10);
  const bridgeSkills = profile.skills.filter((skill) => ["Supplier Management", "Product Validation", "Project Management"].includes(skill)).length;
  const scarcitySignal = Math.min(100, bridgeSkills * 18 + (profile.skills.includes("DFM") ? 18 : 0) + (profile.skills.includes("CAD") ? 10 : 0));
  const score = Math.round(technicalCapital * 0.35 + impactEvidence * 0.3 + transferableCapital * 0.2 + scarcitySignal * 0.15);
  return { technicalCapital, impactEvidence, transferableCapital, scarcitySignal, score, evidence: ["user-demo-profile", "deterministic-skill-and-scope-rules"] };
}
