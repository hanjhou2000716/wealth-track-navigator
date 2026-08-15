import { getAppMode, providerUnavailableMessage } from "../../settings";

export async function GET() {
  const mode = getAppMode();
  return Response.json({
    status: "ok",
    service: "wealth-track-navigator",
    mode,
    providerStatus: mode === "production" ? "fail-closed" : "demo-only",
    message: providerUnavailableMessage(mode),
    checkedAt: new Date().toISOString(),
  });
}
