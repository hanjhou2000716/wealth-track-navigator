# Wealth Track Navigator MCP

This repository now includes a read-only MCP server that exposes the existing Wealth Track Navigator contracts to ChatGPT, Codex, and other MCP-compatible clients.

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

The MCP server needs a stable HTTPS Node runtime separate from the current Sites frontend. Keep `WEALTH_TRACK_APP_URL`, provider credentials, and any future auth secrets in the host secret manager. The current public MCP server is not claimed as deployed until a real Node runtime and HTTPS endpoint are configured.

## Safety boundary

Codex/ChatGPT session authentication is not copied into the server. MCP access is a tool connection; production people, jobs, salary, and LLM providers still require their own authorized server-side adapters and credentials.
