import * as z from "zod/v4";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { acceptancePersonas } from "../app/acceptance";
import { calculateCareerCapital } from "../app/domain";
import { demoProfile } from "../app/demo-data";
import { calculateMarketValue } from "../app/market-value";
import { parseResumeText } from "../app/profile-parser";
import { evaluateLeveling } from "../app/evaluation";
import { calculateCompensation, formatCompensation } from "../app/compensation";

const readOnlyAnnotations = { readOnlyHint: true, destructiveHint: false, openWorldHint: false };

function result(mode: "demo" | "production", data: unknown, text: string) {
  return { structuredContent: { mode, data }, content: [{ type: "text" as const, text }] };
}

function unavailable(mode: "demo" | "production") {
  return result(mode, { unavailable: "資料目前無法取得", code: "PROVIDER_UNAVAILABLE" }, "資料目前無法取得");
}

export function createWorkerMcpServer() {
  const server = new McpServer(
    { name: "wealth-track-navigator", version: "0.1.0" },
    { instructions: "唯讀 Wealth Track Navigator MCP。Demo 結果必須標示 DEMO DATA；Production 沒有合法 provider 時只能回傳資料目前無法取得。" },
  );

  server.registerTool("wealth_track_health", {
    title: "檢查 Wealth Track 狀態",
    description: "Use this when the user wants to確認 Wealth Track Navigator 的服務模式與安全邊界。",
    inputSchema: {},
    outputSchema: { mode: z.string(), data: z.any() },
    annotations: readOnlyAnnotations,
  }, async () => result("demo", { status: "ok", mode: "demo", providerStatus: "demo-only" }, "Wealth Track MCP 狀態正常；目前為 demo-only。"));

  server.registerTool("wealth_track_analyze_profile", {
    title: "分析履歷與職涯資本",
    description: "Use this when the user wants to解析履歷文字並查看結構化職涯資本。",
    inputSchema: { text: z.string().min(1).max(20000), mode: z.enum(["demo", "production"]).default("demo") },
    outputSchema: { mode: z.string(), data: z.any() },
    annotations: readOnlyAnnotations,
  }, async ({ text, mode }) => {
    if (mode === "production") return unavailable(mode);
    const parsed = parseResumeText(text, demoProfile);
    return result("demo", { ...parsed, capital: calculateCareerCapital(parsed.profile) }, "已完成 DEMO 履歷結構化，未補造缺失事實。");
  });

  server.registerTool("wealth_track_market_value", {
    title: "查看市場價值",
    description: "Use this when the user wants to查看可解釋的市場價值與證據欄位。",
    inputSchema: { mode: z.enum(["demo", "production"]).default("demo") },
    outputSchema: { mode: z.string(), data: z.any() },
    annotations: readOnlyAnnotations,
  }, async ({ mode }) => mode === "production" ? unavailable(mode) : result("demo", { marketValue: calculateMarketValue(demoProfile), evidence: "DEMO DATA" }, "市場價值為 DEMO DATA，請同時查看 evidence 與 freshness。"));

  server.registerTool("wealth_track_compensation", {
    title: "比較四年總包",
    description: "Use this when the user wants to比較 TW、US、SG、JP 的 vesting-aware compensation。",
    inputSchema: { mode: z.enum(["demo", "production"]).default("demo") },
    outputSchema: { mode: z.string(), data: z.any() },
    annotations: readOnlyAnnotations,
  }, async ({ mode }) => {
    if (mode === "production") return unavailable(mode);
    const input = { base: 1080000, annualBonusRate: 0.12, equity: 600000, vesting: [0.25, 0.25, 0.25, 0.25], signOn: 150000, region: "TW" as const, currency: "NTD" };
    const regions = (["TW", "US", "SG", "JP"] as const).map((region) => {
      const value = calculateCompensation({ ...input, region });
      return { region, fourYearTotal: value.fourYearTotal, formatted: formatCompensation(value.fourYearTotal, input.currency), realIndex: value.realIndex };
    });
    return result("demo", { regions, evidence: "DEMO DATA" }, "四年總包為 DEMO DATA，已納入 vesting，不代表即時市場報價。");
  });

  server.registerTool("wealth_track_leveling_evaluation", {
    title: "查看職級 evaluation",
    description: "Use this when the user wants to查看可重現的 blind leveling evaluation 結果。",
    inputSchema: {},
    outputSchema: { mode: z.string(), data: z.any() },
    annotations: readOnlyAnnotations,
  }, async () => result("demo", { evaluation: evaluateLeveling() }, "這是 300 cases 的工程 harness，不是市場真實準確率。"));

  server.registerTool("wealth_track_acceptance", {
    title: "查看驗收 persona",
    description: "Use this when the user wants to查看六組 acceptance persona 的 PASS 與限制。",
    inputSchema: {},
    outputSchema: { mode: z.string(), data: z.any() },
    annotations: readOnlyAnnotations,
  }, async () => result("demo", { total: acceptancePersonas.length, personas: acceptancePersonas, overall: "PASS_WITH_DEMO_BOUNDARY" }, "六組 acceptance persona 已通過 demo boundary 驗證。"));

  return server;
}

export async function handleWorkerMcp(request: Request): Promise<Response> {
  const transport = new WebStandardStreamableHTTPServerTransport({ enableJsonResponse: true });
  const server = createWorkerMcpServer();
  await server.connect(transport);
  const response = await transport.handleRequest(request);
  const headers = new Headers(response.headers);
  headers.set("access-control-allow-origin", "*");
  headers.set("access-control-allow-methods", "GET, POST, DELETE, OPTIONS");
  headers.set("access-control-allow-headers", "Content-Type, mcp-session-id, mcp-protocol-version, Last-Event-ID");
  headers.set("access-control-expose-headers", "mcp-session-id, mcp-protocol-version");
  return new Response(response.body, { status: response.status, headers });
}
