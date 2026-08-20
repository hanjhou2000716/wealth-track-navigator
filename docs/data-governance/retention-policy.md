# Retention policy

目前正式 Provider registry 的 retention 預設為 `0` 天；示範 Provider 不代表正式資料儲存。沒有 D1 與身份驗證時，伺服器不宣稱持久保存使用者履歷。

任何新 Provider 必須明確定義：

- 保存目的與資料欄位
- 最大保存期限
- 刪除／撤回流程
- 是否允許 bulk storage 或再分發
- PII 欄位是否為 false

沒有明確政策的 Provider 在 production mode 直接拒絕。
