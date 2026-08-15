# AI pipeline

核心流程採「規則先行、模型可插拔」：

1. Deterministic extraction：從使用者輸入抽取可驗證欄位。
2. Rule engine：以職務家族、職級 ontology 與 evidence dimensions 計算候選結果。
3. `LLMProvider`：只在規則衝突、證據不完整或需要解釋時使用；模型名稱由 server-side `LLM_MODEL` 設定。
4. Structured output validation：輸出必須通過 typed schema；失敗回傳 `MALFORMED`，不得直接寫入核心資料。

LLM 不是事實來源。FACT 必須由 EvidenceGate 取得至少一筆有效 evidence；INFERENCE、RECOMMENDATION 與 UNKNOWN 在 UI 中分開標示。
