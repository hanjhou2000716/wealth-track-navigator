import type { Profile } from "./domain";

export const demoProfile: Profile = {
  name: "Jordan Huang",
  location: "Taoyuan, Taiwan",
  summary: "Mechanical engineer with product validation, supplier coordination and cross-functional delivery experience.",
  skills: ["DFM", "Supplier Management", "Product Validation", "CAD", "Root Cause Analysis"],
  employment: [{ company: "Garmin", role: "Mechanical Engineer", startedAt: "2022-04", scope: "Owned mechanical validation for wearable product subsystems", impact: "Reduced pilot build rework through supplier quality loop" }],
  education: ["National Taiwan University of Science and Technology · Mechanical Engineering"],
  projects: ["Wearable enclosure redesign", "Supplier KPI review cadence"],
  languages: ["Mandarin", "English"],
  certificates: ["Six Sigma Green Belt"],
};
