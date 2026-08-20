import { getAppMode, providerUnavailableMessage } from "../../settings";

export async function GET() {
  const mode = getAppMode();
  return Response.json({ mode, profiles: [], referrals: [], unavailable: mode === "production" ? providerUnavailableMessage(mode) : "沒有已驗證的示範人脈資料" });
}
