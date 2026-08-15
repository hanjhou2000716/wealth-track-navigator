# Wealth Track Navigator

高薪賽道 AI 職涯導航系統：以證據、職級 ontology、薪酬計算與策略規劃，協助使用者回答「下一步去哪裡、補什麼能力、如何讓人力資本複利」。

## 目前版本

- 繁體中文深色 Career Intelligence dashboard。
- Profile 貼上解析、結構化欄位與人工修正。
- Evidence / Claim / Freshness / Confidence domain contracts。
- Demo / Production mode 邊界與 Provider license gate。
- WT-IC / WT-M blind leveling contract。
- vesting-aware compensation、gap matrix、90／180／365 日 strategy API。
- PDF／DOCX／TXT／貼上文字的 typed profile ingestion；外部 Profile URL 在沒有授權 Provider 時明確 fail closed。
- 300 筆可重現 blind leveling evaluation harness、health contract、CI workflow 與基本 response security headers。
- 明確的 Profile／Leveling／Evidence／Provider／Radar／Alumni／Trajectory／Compensation／Strategy／Scoring service contracts，以及 12 類 failure-injection catalog。
- 公開示範網站：[Wealth Track Navigator](https://wealth-track-navigator.prstkteam006208.chatgpt.site/)。

## 模式

`APP_MODE=demo` 顯示明確標示的示範資料；`APP_MODE=production` 在沒有合法 Provider 時 fail closed，顯示「資料目前無法取得」。禁止用模型補造真人、薪資、樣本數或來源。

## 本機

需要 Node.js 22+。安裝依賴後執行 `vinext dev`；建置使用 `vinext build`，測試使用 `node --test tests/rendered-html.test.mjs`。

## 已知限制

目前仍是第一個可用 vertical slice：正式 licensed people／compensation provider、資料庫 authentication、外部 E2E corpus、CI 的遠端執行結果與 production credentials 尚未配置，因此不能宣稱整份原始規格的 Production Ready。公開版本的正確狀態是「Demo／fail-closed，供使用者驗收產品流程」。履歷修正目前只保存於瀏覽器本機，直到 D1 與身份驗證完成前不接受真正個資作為正式資料庫紀錄。
