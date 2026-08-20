import { handleWorkerMcp } from "../../../mcp/worker";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return handleWorkerMcp(request);
}

export function POST(request: Request) {
  return handleWorkerMcp(request);
}

export function DELETE(request: Request) {
  return handleWorkerMcp(request);
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, DELETE, OPTIONS",
      "access-control-allow-headers": "Content-Type, mcp-session-id, mcp-protocol-version, Last-Event-ID",
    },
  });
}
