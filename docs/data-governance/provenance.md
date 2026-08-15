# Provenance 與資料治理

所有核心結果都應攜帶 `sourceProvider`、`sourceType`、`retrievedAt`、`sourceTier`、`freshness` 與 deterministic `confidence`。

Demo mode 使用 `demo://` 來源並在 UI 標示「示範資料」。Production mode 沒有合法 Provider 時回傳「資料目前無法取得」，不以猜測或假資料補足。

真人 Profile、Email、Phone、Address 預設不啟用；只有具備明確授權與合約的 Provider 才能查詢。
