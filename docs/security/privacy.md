# Privacy and security boundary

The current public deployment is a demo-mode, fail-closed application.

- No LinkedIn scraping is used.
- The demo profile is synthetic and contains no user account or contact PII.
- Provider registrations reject email, phone, and address fields unless a future licensed contract explicitly changes the policy.
- Production mode returns unavailable states when a verified licensed provider is absent; it does not substitute demo data.
- The worker sets `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and a restrictive `Permissions-Policy`.
- `npm run security:scan` inspects tracked source/config/documentation for private-key blocks, API-key-shaped literals, `NEXT_PUBLIC_*` secret variables, and bearer-token literals; it runs in the GitHub Actions workflow.
- Profile files are parsed server-side in memory with an 8 MB limit. The demo correction flow stores only the edited demo profile in browser local storage and does not claim durable server persistence.

Authentication, durable user storage, consent records, deletion workflows, secret management, and audit-log retention remain deployment prerequisites before accepting real personal data.
