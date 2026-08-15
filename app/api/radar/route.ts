import { getAppMode, providerUnavailableMessage } from "../../settings";

export async function GET() {
  const mode = getAppMode();
  if (mode === "production") return Response.json({ mode, items: [], unavailable: providerUnavailableMessage(mode) });
  return Response.json({
    mode,
    items: [
      { track: "FIT", role: "Senior Mechanical Engineer", company: "Demo hardware company", match: 82, evidence: "demo-profile-scope" },
      { track: "STRETCH", role: "Product Design Lead", company: "Demo device company", match: 64, gap: "business impact", evidence: "demo-leveling-gap" },
    ],
    evidence: "DEMO DATA — no external job provider connected",
  });
}
