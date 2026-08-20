import { failureInjectionCases } from "../../failure-injection";
export async function GET() { return Response.json({ mode: "test-catalog", cases: failureInjectionCases, total: failureInjectionCases.length }); }
