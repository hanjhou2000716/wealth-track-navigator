import type { Profile } from "./domain";

export type RadarItem = { track: "FIT" | "STRETCH"; role: string; company: string; match: number; gaps: string[]; evidence: string[] };

function has(profile: Profile, skill: string): boolean { return profile.skills.some((item) => item.toLowerCase() === skill.toLowerCase()); }

export function buildJobRadar(profile: Profile): RadarItem[] {
  const fitGaps = [has(profile, "產品驗證") ? null : "產品驗證證據", profile.employment[0]?.scope ? null : "職責範圍所有權"].filter((item): item is string => Boolean(item));
  const stretchGaps = [profile.employment[0]?.impact ? null : "商業影響", has(profile, "專案管理") ? null : "跨部門領導"].filter((item): item is string => Boolean(item));
  return [
    { track: "FIT", role: "資深機械工程師", company: "示範硬體公司", match: Math.max(55, 88 - fitGaps.length * 12), gaps: fitGaps, evidence: ["demo-profile-scope", "deterministic-role-skill-match"] },
    { track: "STRETCH", role: "產品設計主管", company: "示範裝置公司", match: Math.max(40, 70 - stretchGaps.length * 10), gaps: stretchGaps, evidence: ["demo-leveling-gap", "deterministic-role-skill-match"] },
  ];
}
