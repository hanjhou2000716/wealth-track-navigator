# Data flow

```text
使用者履歷／檔案
  → Profile ingestion（typed schema）
  → ProfileService
  → Leveling + Market Value + Gap
  → Evidence / Confidence gate
  → Strategy / UI
```

外部資料只能經過 ProviderService 與 License Registry。每個可顯示的事實都必須帶有 provenance；沒有可靠來源時，流程回傳 `資料目前無法取得` 或明確的空狀態。示範資料使用 `demo://` 來源並在畫面標示示範資料，不會寫入正式資料庫。

## 邊界

- Profile URL 是 resolver input，不是爬蟲入口。
- Production API 不以模型推測真人、薪資、樣本數或公司統計。
- 瀏覽器只保存示範修正內容；目前 D1 與身份驗證未配置，因此不宣稱正式持久化。
