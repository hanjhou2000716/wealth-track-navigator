export type GapCategory = "SELF_LEARNING" | "PROJECT_UPGRADE" | "ROLE_AUTHORITY_REQUIRED" | "REAL_EXPERIENCE_REQUIRED";
export type Gap = { dimension: string; current: number; target: number; delta: number; category: GapCategory; nextAction: string };

export function buildGapMatrix(current: Record<string, number>, target: Record<string, number>): Gap[] {
  const actions: Record<string, { category: GapCategory; nextAction: string }> = {
    Experience: { category: "REAL_EXPERIENCE_REQUIRED", nextAction: "Own one subsystem through launch" },
    TechnicalDepth: { category: "SELF_LEARNING", nextAction: "Build a focused product-design case study" },
    Scope: { category: "ROLE_AUTHORITY_REQUIRED", nextAction: "Ask for end-to-end subsystem ownership" },
    Leadership: { category: "PROJECT_UPGRADE", nextAction: "Lead a cross-functional delivery ritual" },
    Impact: { category: "PROJECT_UPGRADE", nextAction: "Track cost, yield or quality outcome" },
    CrossFunctional: { category: "PROJECT_UPGRADE", nextAction: "Create a supplier and design decision log" },
  };
  return Object.keys(target).map((dimension) => { const value = current[dimension] ?? 0; const item = actions[dimension] ?? { category: "SELF_LEARNING", nextAction: "Collect evidence for this dimension" }; return { dimension, current: value, target: target[dimension], delta: Math.max(0, target[dimension] - value), ...item }; }).sort((a, b) => b.delta - a.delta);
}
