# Provider contract

People Provider 必須實作 `searchPeople`、`getPerson`、`getCareerHistory`、`searchByCompany` 與 `searchByEducation`，並回傳 typed `ServiceResult`。Jobs、薪酬與生活成本 Provider 使用相同的 policy boundary，不得讓產品模組直接依賴特定供應商 SDK。

每個結果都必須能指出 provider、source record、取得時間、freshness、source tier 與 confidence。錯誤要轉成 `TIMEOUT`、`RATE_LIMIT`、`AUTH`、`FORBIDDEN`、`SERVER`、`MALFORMED` 或 `EMPTY`，讓 UI 可以 graceful degradation。
