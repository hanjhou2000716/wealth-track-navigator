export async function GET() {
  return Response.json({
    status: "not_provisioned",
    durableStorage: false,
    piiWrites: false,
    reason: "D1 is intentionally unbound in the public demo deployment",
    migration: "drizzle/0000_short_blink.sql",
  }, { status: 503 });
}
