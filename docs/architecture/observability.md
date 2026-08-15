# Observability contract

Every Worker response receives a validated `x-request-id` and `x-analysis-run-id`. Caller-supplied IDs are accepted only when they match the safe identifier pattern; otherwise opaque UUIDs are generated.

The response also carries `Cache-Control: no-store` for analysis endpoints. Operational context contains no resume text, email, phone, token, or raw provider payload. Provider metrics should be emitted as event names, status codes, latency, and opaque IDs only when a real provider is connected.
