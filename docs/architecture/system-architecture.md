# Wealth Track Navigator 系統架構

本專案是獨立的 Wealth Track Navigator Web Application，不依賴舊 MCP 專案。

## 邊界

- `app/page.tsx`：繁體中文產品介面與可編輯 Profile workflow。
- `app/domain.ts`：Evidence、Claim、Profile、信任與 deterministic scoring 型別。
- `app/provider-registry.ts`：Provider license registry 與 runtime gate。
- `app/leveling.ts`：Wealth Track IC／Management ontology 與 blind-scope evaluation。
- `app/compensation.ts`：vesting-aware total compensation 與 COL adjustment。
- `app/gap-matrix.ts`：職涯差距分類與下一步行動。
- `app/api/*`：typed analysis contracts；Provider 不可用時 fail closed。

## 資料流

`User input → Structured Profile → Evidence/Trust → Level & Capital → Gap → Strategy`。

LLM（若未來接入）只能負責解析、解釋與建議；Fact 必須有 Evidence，不能以模型文字取代來源。
