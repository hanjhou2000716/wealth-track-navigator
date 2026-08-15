# Privacy and security boundary

The current public deployment is a demo-mode, fail-closed application.

- No LinkedIn scraping is used.
- The demo profile is synthetic and contains no user account or contact PII.
- Provider registrations reject email, phone, and address fields unless a future licensed contract explicitly changes the policy.
- Production mode returns unavailable states when a verified licensed provider is absent; it does not substitute demo data.
- The worker sets `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and a restrictive `Permissions-Policy`.

Authentication, durable user storage, consent records, deletion workflows, secret management, and audit-log retention remain deployment prerequisites before accepting real personal data.
