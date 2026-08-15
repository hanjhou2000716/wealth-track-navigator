import { blindLevel } from "../../leveling";

export async function GET() {
  const result = blindLevel({ scope: 61, complexity: 56, autonomy: 63, impact: 55, leadership: 42, crossFunctional: 68, decisionRights: 48, stakeholderScope: 52, businessOwnership: 34, mentorship: 30 });
  return Response.json({ track: "IC", titleLevel: "WT-IC2", blind: result, titleArbitrage: 1, methodology: "blind-scope-evidence-v1" });
}
