# Adding a provider

1. 建立 adapter，不修改 Module 4–6 的 domain contract。
2. 在 `config/providers.json` 與 `app/provider-registry.ts` 登錄用途、合約驗證、PII 與 retention。
3. 加入 contract tests、timeout／429／401／403／500／malformed／empty 測試。
4. 以 environment-side kill switch 控制啟用；秘密不得使用 `NEXT_PUBLIC_*`。
5. 先在 demo／staging 驗證 provenance，再由人工審核 production license。

`enabled=true` 且 `contract_verified=true`，並通過 PII policy，才可查詢 production。沒有有效憑證時保留 adapter interface 與 fail-closed 行為，不偽造資料。
