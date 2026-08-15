export type RequestContext = { requestId: string; analysisRunId: string };

function safeHeader(value: string | null): string | null {
  return value && /^[A-Za-z0-9._-]{1,80}$/.test(value) ? value : null;
}

export function requestContext(request: Request): RequestContext {
  const requestId = safeHeader(request.headers.get("x-request-id")) ?? `req_${crypto.randomUUID()}`;
  const analysisRunId = safeHeader(request.headers.get("x-analysis-run-id")) ?? `run_${crypto.randomUUID()}`;
  return { requestId, analysisRunId };
}

export function withOperationalHeaders(response: Response, context: RequestContext): Response {
  const headers = new Headers(response.headers);
  headers.set("x-request-id", context.requestId);
  headers.set("x-analysis-run-id", context.analysisRunId);
  headers.set("cache-control", headers.get("cache-control") ?? "no-store");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
