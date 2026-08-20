# Wealth Track Navigator MCP

This repository now includes a read-only MCP server that exposes the existing Wealth Track Navigator contracts to ChatGPT, Codex, and other MCP-compatible clients. The Cloudflare Worker adapter also serves `/mcp` from the same HTTPS deployment when the Sites worker is redeployed.

## Archetype

Primary archetype: **tool-only MCP**. The existing responsive Traditional Chinese Sites dashboard remains the visual product; the MCP server exposes the same evidence-aware workflow without requiring a custom iframe UI. A widget can be added later without changing the tool contracts.

## Tools

- `wealth_track_health`
- `wealth_track_analyze_profile`
- `wealth_track_market_value`
- `wealth_track_compensation`
- `wealth_track_leveling_evaluation`
- `wealth_track_acceptance`

All tools are read-only. Demo results are labeled, and production mode fails closed when no verified provider is configured. The server does not log resume content or return secrets.

## Run locally

```powershell
npm ci
$env:WEALTH_TRACK_APP_URL = "https://wealth-track-navigator.prstkteam006208.chatgpt.site"
$env:MCP_HOST = "127.0.0.1"
$env:MCP_PORT = "8787"
npm run mcp:start
```

The MCP endpoint is `http://127.0.0.1:8787/mcp`; health is `http://127.0.0.1:8787/healthz`.

For ChatGPT Developer Mode, expose the endpoint through a public HTTPS tunnel, then add the tunnel URL ending in `/mcp` under **Settings → Apps & Connectors → Advanced settings**. Refresh the app after changing tool metadata. Do not expose a local-only URL to a hosted client.

## Hosting

The Node server can run on a separate stable HTTPS runtime. The Cloudflare Worker adapter (`mcp/worker.ts`) is the preferred same-origin deployment path for the existing Sites worker; it uses stateless Streamable HTTP and does not require an OpenAI API key for demo tools. Keep provider credentials and any future auth secrets in the host secret manager. The `/mcp` URL is not claimed as public until the updated worker is deployed and smoke-tested.

## Safety boundary

Codex/ChatGPT session authentication is not copied into the server. MCP access is a tool connection; production people, jobs, salary, and LLM providers still require their own authorized server-side adapters and credentials.
