# Deployment guide

## Demo deployment

1. `npm ci`
2. `npm run typecheck`
3. `npm run build`
4. `node --test tests/rendered-html.test.mjs`
5. `npm run security:scan`
6. 由 Sites 儲存與部署含有 `.openai/hosting.json` 的 build archive。

目前公開網址是 [Wealth Track Navigator](https://wealth-track-navigator.prstkteam006208.chatgpt.site/)，版本 v28，狀態為 Demo／fail-closed。

## Production gate

Production 需要真正可用的身份驗證、D1、licensed Provider、server-side secrets、遠端 CI 與 E2E corpus。缺少任一項時，部署可以是 demo，但不得標示 Production Ready；API 應回傳「資料目前無法取得」而不是補造資料。

## Rollback

Sites 應重新部署上一個已驗證的 saved version；不要直接修改公開 build。每次部署記錄 commit SHA、version ID、deployment ID、smoke test 與已知限制。
