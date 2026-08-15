# Data sources

| 類型 | 允許來源 | 示範模式 | Production 未配置時 |
|---|---|---|---|
| 履歷 | 使用者自行提供 | `demo://` seed | 接受使用者輸入 |
| 職缺 | 官方職缺頁或已授權 Jobs API | 不連接外部來源 | 空狀態／不可取得 |
| 真人職涯 | 已驗證且合約允許的 People Provider | 不顯示真人 | 阻擋查詢 |
| 薪酬與生活成本 | 已驗證的結構化 Provider | 明確標示示範 | 不補造數字 |

Tier D 模型推論不能單獨成為 factual source。來源、取得時間、freshness 與 confidence 必須隨結果保存或回傳。
