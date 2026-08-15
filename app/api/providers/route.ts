import { providerState } from "../../provider-registry";
import { getAppMode } from "../../settings";

export async function GET(request: Request) {
  const requestedMode = new URL(request.url).searchParams.get("mode");
  const mode = requestedMode === "production" ? "production" : getAppMode();
  return Response.json({ mode, states: ["people", "compensation", "cost_of_living", "jobs"].map((purpose) => providerState(mode, purpose as "people" | "compensation" | "cost_of_living" | "jobs")) });
}
