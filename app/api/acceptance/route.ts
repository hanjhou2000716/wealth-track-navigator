import { acceptancePersonas } from "../../acceptance";

export async function GET() {
  return Response.json({ mode: "demo", total: acceptancePersonas.length, personas: acceptancePersonas, overall: "PASS_WITH_DEMO_BOUNDARY" });
}
