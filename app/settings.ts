export type AppMode = "demo" | "production";

export function getAppMode(value = process.env.APP_MODE): AppMode {
  return value === "production" ? "production" : "demo";
}

export function providerUnavailableMessage(mode: AppMode): string | null {
  return mode === "production" ? "資料目前無法取得" : null;
}
