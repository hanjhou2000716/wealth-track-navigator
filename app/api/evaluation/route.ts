import { evaluateLeveling } from "../../evaluation";

export async function GET() {
  return Response.json({ mode: "demo", evaluation: evaluateLeveling() });
}
