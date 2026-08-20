import type { Profile } from "./domain";

export type TrajectoryEdge = { from: string; to: string; role: string; springboardScore: number; sampleSize: number; evidence: string[]; quality: "DEMO_INSUFFICIENT" | "LICENSED" };

export function buildDemoTrajectory(profile: Profile): TrajectoryEdge[] {
  const current = profile.employment[0]?.company || "目前職位";
  return [
    { from: current, to: "Apple", role: "資深產品設計", springboardScore: 68, sampleSize: 3, evidence: ["demo-seed-garmin-to-apple", "user-demo-profile"], quality: "DEMO_INSUFFICIENT" },
    { from: current, to: "國際半導體公司", role: "硬體系統主管", springboardScore: 61, sampleSize: 3, evidence: ["demo-seed-tsmc-to-international", "deterministic-transferable-capital"], quality: "DEMO_INSUFFICIENT" },
  ];
}
