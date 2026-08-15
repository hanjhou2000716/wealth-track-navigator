import type { Profile } from "./domain";

const knownSkills = ["Python", "CAD", "DFM", "Supplier Management", "Product Validation", "SQL", "Project Management"];

export function parseResumeText(text: string, fallback: Profile) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (!lines.length) return { profile: fallback, detectedSkills: [], claims: [] };
  const detectedSkills = knownSkills.filter((skill) => text.toLowerCase().includes(skill.toLowerCase()));
  const summary = lines.slice(1, 3).join(" ");
  return {
    profile: {
      ...fallback,
      name: lines[0].slice(0, 80),
      summary: summary || fallback.summary,
      skills: detectedSkills.length ? detectedSkills : fallback.skills,
    },
    detectedSkills,
    claims: [
      { kind: "FACT", text: "姓名與摘要由使用者貼上的文字抽取", evidence: "user-pasted-resume", confidence: 100 },
      { kind: "FACT", text: `${detectedSkills.length} 個技能關鍵字被直接辨識`, evidence: "deterministic-keyword-parser", confidence: 100 },
    ],
  };
}
