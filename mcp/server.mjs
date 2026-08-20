import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import * as z from "zod/v4";

const DEFAULT_APP_BASE_URL = "https://wealth-track-navigator.prstkteam006208.chatgpt.site";
const PORT = Number(process.env.MCP_PORT || 8787);
const APP_BASE_URL = String(process.env.WEALTH_TRACK_APP_URL || DEFAULT_APP_BASE_URL).replace(/\/$/, "");

const readOnlyAnnotations = {
  readOnlyHint: true,
  destructiveHint: false,
  openWorldHint: false,
};

async function appJson(path, init) {
  const response = await fetch(`${APP_BASE_URL}${path}`, {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
  });
  const body = await response.json().catch(() => ({ error: "invalid upstream response" }));
  if (!response.ok) throw new Error(`Wealth Track upstream returned ${response.status}`);
  return body;
}

async function readApp(path, init) {
  try {
    return { data: await appJson(path, init) };
  } catch {
    return { unavailable: "資料目前無法取得", code: "UPSTREAM_UNAVAILABLE" };
  }
}

function result(mode, data, text) {
  return {
    structuredContent: { mode, data },
    content: [{ type: "text", text }],
  };
}

function unavailable(mode, reason = "資料目前無法取得") {
  return result(mode, { unavailable: reason }, `${mode === "production" ? "Production" : "Demo"}：${reason}`);
}

export function createWealthTrackServer() {
  const server = new McpServer(
    {
      name: "wealth-track-navigator",
      version: "0.1.0",
    },
    {
      instructions:
        "這是 Wealth Track Navigator 的唯讀 MCP。Demo 結果必須標示 DEMO DATA；Production 沒有合法 provider 時只能回傳資料目前無法取得，不得補造真人、薪資、樣本數或來源。",
    },
  );

  server.registerTool(
    "wealth_track_health",
    {
      title: "檢查 Wealth Track 狀態",
      description: "Use this when the user wants to確認 Wealth Track Navigator 的服務、模式與 provider 安全狀態。",
      inputSchema: {},
      outputSchema: { mode: z.string(), data: z.any() },
      annotations: readOnlyAnnotations,
    },
    async () => {
      const upstream = await readApp("/api/health");
      if (!upstream.data) return unavailable("unknown", upstream.unavailable);
      const data = upstream.data;
      return result(data.mode || "demo", data, `Wealth Track 狀態：${data.status}；模式：${data.mode}。`);
    },
  );

  server.registerTool(
    "wealth_track_analyze_profile",
    {
      title: "分析履歷與職涯資本",
      description: "Use this when the user wants to解析履歷文字、整理結構化 profile，並查看可追溯的職涯資本結果。",
      inputSchema: {
        text: z.string().min(1).max(20000).describe("使用者提供的履歷文字；最多 20,000 字元"),
        mode: z.enum(["demo", "production"]).default("demo").describe("分析模式"),
      },
      outputSchema: { mode: z.string(), data: z.any() },
      annotations: readOnlyAnnotations,
    },
    async ({ text, mode }) => {
      if (mode === "production") return unavailable(mode);
      const upstream = await readApp("/api/profile/parse", { method: "POST", body: JSON.stringify({ text }) });
      if (!upstream.data) return unavailable(mode, upstream.unavailable);
      const data = upstream.data;
      return result("demo", data, "已完成履歷結構化；結果包含 DEMO／使用者提供資料邊界，未補造缺失事實。");
    },
  );

  server.registerTool(
    "wealth_track_market_value",
    {
      title: "查看市場價值",
      description: "Use this when the user wants to查看可解釋的市場價值與證據欄位。沒有合法 production provider 時必須維持 unavailable。",
      inputSchema: { mode: z.enum(["demo", "production"]).default("demo") },
      outputSchema: { mode: z.string(), data: z.any() },
      annotations: readOnlyAnnotations,
    },
    async ({ mode }) => {
      if (mode === "production") return unavailable(mode);
      const upstream = await readApp("/api/market-value");
      if (!upstream.data) return unavailable(mode, upstream.unavailable);
      const data = upstream.data;
      return result("demo", data, "市場價值為 DEMO DATA，請同時查看 evidence、freshness 與 provider 狀態。");
    },
  );

  server.registerTool(
    "wealth_track_compensation",
    {
      title: "比較四年總包",
      description: "Use this when the user wants to比較 TW、US、SG、JP 的 vesting-aware compensation。Production provider 未驗證時不可補造薪資。",
      inputSchema: { mode: z.enum(["demo", "production"]).default("demo") },
      outputSchema: { mode: z.string(), data: z.any() },
      annotations: readOnlyAnnotations,
    },
    async ({ mode }) => {
      if (mode === "production") return unavailable(mode);
      const upstream = await readApp("/api/compensation");
      if (!upstream.data) return unavailable(mode, upstream.unavailable);
      const data = upstream.data;
      return result("demo", data, "四年總包與 vesting 計算為 DEMO DATA，不代表即時市場報價。");
    },
  );

  server.registerTool(
    "wealth_track_leveling_evaluation",
    {
      title: "查看職級 evaluation",
      description: "Use this when the user wants to查看 Wealth Track blind leveling harness 的可重現結果與限制。",
      inputSchema: {},
      outputSchema: { mode: z.string(), data: z.any() },
      annotations: readOnlyAnnotations,
    },
    async () => {
      const upstream = await readApp("/api/evaluation");
      if (!upstream.data) return unavailable("demo", upstream.unavailable);
      const data = upstream.data;
      return result("demo", data, `目前 evaluation corpus：${data.evaluation?.totalCases || 0} cases；這是工程 harness，不是市場真實準確率。`);
    },
  );

  server.registerTool(
    "wealth_track_acceptance",
    {
      title: "查看驗收 persona",
      description: "Use this when the user wants to查看六組 production acceptance persona 的明確 PASS／限制狀態。",
      inputSchema: {},
      outputSchema: { mode: z.string(), data: z.any() },
      annotations: readOnlyAnnotations,
    },
    async () => {
      const upstream = await readApp("/api/acceptance");
      if (!upstream.data) return unavailable("demo", upstream.unavailable);
      const data = upstream.data;
      return result("demo", data, `Acceptance personas：${data.total || 0} 組；overall=${data.overall || "unknown"}。`);
    },
  );

  return server;
}

export function createWealthTrackMcpApp() {
  const app = createMcpExpressApp({ host: process.env.MCP_HOST || "127.0.0.1" });
  app.use(express.json({ limit: "256kb" }));
  const transports = new Map();

  app.get("/healthz", (_req, res) => res.json({ status: "ok", service: "wealth-track-navigator-mcp", appBaseUrl: APP_BASE_URL }));

  app.post("/mcp", async (req, res) => {
    try {
      const sessionId = req.headers["mcp-session-id"];
      let transport = sessionId ? transports.get(sessionId) : undefined;
      if (!transport && !sessionId && isInitializeRequest(req.body)) {
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: (id) => transports.set(id, transport),
        });
        const server = createWealthTrackServer();
        server.server.onclose = () => {
          if (transport?.sessionId) transports.delete(transport.sessionId);
        };
        await server.connect(transport);
      }
      if (!transport) {
        res.status(400).json({ jsonrpc: "2.0", error: { code: -32000, message: "No valid MCP session" }, id: null });
        return;
      }
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error("MCP request failed", error instanceof Error ? error.message : "unknown error");
      if (!res.headersSent) res.status(500).json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null });
    }
  });

  app.get("/mcp", async (req, res) => {
    const sessionId = req.headers["mcp-session-id"];
    const transport = sessionId ? transports.get(sessionId) : undefined;
    if (!transport) return res.status(400).send("Invalid or missing MCP session");
    await transport.handleRequest(req, res);
  });

  app.delete("/mcp", async (req, res) => {
    const sessionId = req.headers["mcp-session-id"];
    const transport = sessionId ? transports.get(sessionId) : undefined;
    if (!transport) return res.status(404).send("Unknown MCP session");
    await transport.handleRequest(req, res);
    transports.delete(sessionId);
  });
  return app;
}

export function startWealthTrackMcp() {
  const app = createWealthTrackMcpApp();
  return app.listen(PORT, process.env.MCP_HOST || "127.0.0.1", () => {
    console.log(`Wealth Track MCP listening on http://${process.env.MCP_HOST || "127.0.0.1"}:${PORT}/mcp`);
  });
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) startWealthTrackMcp();
