# Failure injection catalog

`GET /api/failure-injection` exposes the mandatory failure matrix used by contract tests. It covers timeout, 429, 401, 403, 500, malformed JSON, empty datasets, duplicate profiles, missing or stale salary, unknown companies, and ambiguous management roles.

The expected policies are explicit:

- retryable provider failures may be retried but never replaced with invented facts;
- auth, forbidden, stale, and unavailable data become unavailable states;
- malformed or ambiguous input is validated and surfaced for review;
- empty data remains empty-safe;
- duplicate profiles are deduplicated before analysis.

The current catalog is a policy test fixture, not evidence that a paid external provider is connected.
