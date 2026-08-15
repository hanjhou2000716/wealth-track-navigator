# Provider License Registry

目前 registry 提供三個 adapter 狀態：

| Provider | 狀態 | Production query |
| --- | --- | --- |
| Demo Provider | enabled / contract verified | 僅 Demo mode |
| Licensed People Provider | disabled / unverified | 阻擋 |
| Licensed Compensation Provider | disabled / unverified | 阻擋 |

Runtime 必須同時滿足 `enabled == true`、`contractVerified == true`、purpose 匹配，且 PII 權限維持關閉，才可進入 Production query。
