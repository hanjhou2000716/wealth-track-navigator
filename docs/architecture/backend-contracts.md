# Backend contracts

The backend is intentionally split into service interfaces rather than a single AI endpoint:

`ProfileService` → `LevelingService` → `EvidenceService` → `ScoringService` / `StrategyService`, with `ProviderService` adapters behind Job Radar, Alumni, Trajectory, and Compensation services.

`LLMProvider` is provider-agnostic and accepts a typed `StructuredSchema`. The model is read only from the server-side `LLM_MODEL` environment variable; an unconfigured model is reported as `unconfigured`. A malformed result becomes a typed `MALFORMED` failure and cannot enter a core record as natural language.

The D1 schema reserves user ownership and evidence references for profiles, employment, education, projects, skills, analysis runs, jobs, people, career edges, companies, universities, compensation, provider registry, evidence, and strategy plans. The public site currently keeps D1 unbound and remains demo-only.

## Profile ingestion contract

`POST /api/profile/ingest` accepts either JSON text or a multipart `file` field. Supported file extensions are `.pdf`, `.docx`, and `.txt`; the typed extractor returns normalized text before the deterministic profile parser runs. A malformed file returns `422 / MALFORMED`, an empty document returns `422 / EMPTY`, and files larger than 8 MB return `413`.

`kind=url` is intentionally an architecture boundary, not a scraper. It validates the URL and returns `503 / UNSUPPORTED` until an authorized Profile URL Provider is configured. The endpoint never fetches LinkedIn or another external profile on behalf of a user without an approved provider contract.

Corrected profile fields are currently saved in browser local storage by the demo UI. They are not sent to the unbound D1 database; this limitation is displayed in the editor.
