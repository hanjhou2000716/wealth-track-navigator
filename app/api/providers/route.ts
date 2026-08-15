import { providerState } from "../../provider-registry";

export async function GET(request: Request) {
  const mode = new URL(request.url).searchParams.get("mode") === "production" ? "production" : "demo";
  return Response.json({ mode, states: ["people", "compensation", "cost_of_living", "jobs"].map((purpose) => providerState(mode, purpose as "people" | "compensation" | "cost_of_living" | "jobs")) });
}
