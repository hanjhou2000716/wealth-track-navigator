import type { Profile } from "./domain";

export type RadarItem = { track: "FIT" | "STRETCH"; role: string; company: string; match: number; gaps: string[]; evidence: string[] };

function has(profile: Profile, skill: string): boolean { return profile.skills.some((item) => item.toLowerCase() === skill.toLowerCase()); }

export function buildJobRadar(profile: Profile): RadarItem[] {
  const fitGaps = [has(profile, "Product Validation") ? null : "product validation evidence", profile.employment[0]?.scope ? null : "scope ownership"].filter((item): item is string => Boolean(item));
  const stretchGaps = [profile.employment[0]?.impact ? null : "business impact", has(profile, "Project Management") ? null : "cross-functional leadership"].filter((item): item is string => Boolean(item));
  return [
    { track: "FIT", role: "Senior Mechanical Engineer", company: "Demo hardware company", match: Math.max(55, 88 - fitGaps.length * 12), gaps: fitGaps, evidence: ["demo-profile-scope", "deterministic-role-skill-match"] },
    { track: "STRETCH", role: "Product Design Lead", company: "Demo device company", match: Math.max(40, 70 - stretchGaps.length * 10), gaps: stretchGaps, evidence: ["demo-leveling-gap", "deterministic-role-skill-match"] },
  ];
}
