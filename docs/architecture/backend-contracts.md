# Backend contracts

The backend is intentionally split into service interfaces rather than a single AI endpoint:

`ProfileService` → `LevelingService` → `EvidenceService` → `ScoringService` / `StrategyService`, with `ProviderService` adapters behind Job Radar, Alumni, Trajectory, and Compensation services.

`LLMProvider` is provider-agnostic and accepts a typed `StructuredSchema`. The model is read only from the server-side `LLM_MODEL` environment variable; an unconfigured model is reported as `unconfigured`. A malformed result becomes a typed `MALFORMED` failure and cannot enter a core record as natural language.

The D1 schema reserves user ownership and evidence references for profiles, employment, education, projects, skills, analysis runs, jobs, people, career edges, companies, universities, compensation, provider registry, evidence, and strategy plans. The public site currently keeps D1 unbound and remains demo-only.
