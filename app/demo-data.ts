import type { Profile } from "./domain";

export const demoProfile: Profile = {
  name: "黃俊豪",
  location: "桃園，台灣",
  summary: "具備產品驗證、供應商協作與跨部門交付經驗的機械工程師。",
  skills: ["DFM 製造設計", "供應商管理", "產品驗證", "CAD", "根因分析"],
  employment: [{ company: "Garmin", role: "機械工程師", startedAt: "2022-04", scope: "負責穿戴式產品子系統的機構驗證", impact: "透過供應商品質閉環降低試產重工" }],
  education: ["國立臺灣科技大學・機械工程"],
  projects: ["穿戴式產品外殼重新設計", "供應商 KPI 檢視機制"],
  languages: ["中文", "英文"],
  certificates: ["六標準差綠帶"],
};
