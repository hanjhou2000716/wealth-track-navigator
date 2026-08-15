# Provenance 與資料治理

所有核心結果都應攜帶 `sourceProvider`、`sourceType`、`sourceRecordId`（若 Provider 提供）、`retrievedAt`、`sourceTier`、`freshness` 與 deterministic `confidence`。

Confidence 由 `Source Reliability × Freshness × Evidence Coverage × Cross-source Agreement` 計算；模型不能直接指定 confidence。沒有 Evidence 的 FACT 會被降級為 UNKNOWN。

Demo mode 使用 `demo://` 來源並在 UI 標示「示範資料」。Production mode 沒有合法 Provider 時回傳「資料目前無法取得」，不以猜測或假資料補足。

真人 Profile、Email、Phone、Address 預設不啟用；只有具備明確授權與合約的 Provider 才能查詢。
