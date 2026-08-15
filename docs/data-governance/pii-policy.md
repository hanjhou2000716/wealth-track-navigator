# PII policy

- Email、電話、地址預設關閉。
- 不抓取 LinkedIn、不繞過登入、不保存 cookie 或反爬資料。
- 履歷檔案在 server-side parser 以記憶體處理，大小上限 8 MB。
- 示範修正目前只存於瀏覽器 local storage；未配置 D1／身份驗證前，不接受真實個資作為正式持久化資料。
- Log、錯誤回應與前端 bundle 不得包含完整履歷、raw PII 或 secrets。

若未來接入 Provider，必須先完成合約、用途、保留期限與 PII 權限審核，並通過 `ProviderPolicyGuard`。
