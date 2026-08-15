import assert from "node:assert/strict";
import test from "node:test";

async function worker() {
  const entry = await import(new URL(`../dist/server/index.js?test=${Date.now()}`, import.meta.url));
  return entry.default;
}

test("renders the standalone Wealth Track Navigator product shell", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Wealth Track Navigator/i);
  assert.match(html, /讓你的下一步/);
  assert.match(html, /WEALTH TRACK 分數/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|codex-preview/i);
});

test("exposes an analysis contract with evidence and deterministic score fields", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/analysis"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.mode, "demo");
  assert.equal(typeof body.score, "number");
  assert.equal(body.leveling.level, "WT-IC2");
  assert.ok(body.claims.every((claim) => ["FACT", "INFERENCE", "RECOMMENDATION", "UNKNOWN"].includes(claim.kind)));
  assert.ok(body.claims.every((claim) => Array.isArray(claim.evidence)));
  assert.equal(body.trust.breakdown.evidenceCoverage, 88);
  assert.equal(body.trust.sourceTier, "TIER_A_PRIMARY");
});

test("fails closed for production providers without verified licensing", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/providers?mode=production"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.mode, "production");
  assert.ok(body.states.every((state) => state.available === false));
});

test("returns blind leveling evidence and title arbitrage", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/leveling"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.methodology, "blind-scope-evidence-v1");
  assert.equal(body.titleArbitrage, 1);
  assert.equal(body.blind.level, "WT-IC3");
  assert.ok(body.blind.evidenceUsed.includes("Decision rights"));
});

test("returns vesting-aware compensation and prioritized strategy gaps", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/strategy"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.horizons.length, 3);
  assert.equal(body.horizons[0].horizon, "90 days");
  assert.ok(body.gaps[0].delta >= body.gaps.at(-1).delta);
  assert.equal(body.compensation.realIndex, 129);
  assert.match(body.compensation.fourYearTotal, /NTD$/);
});

test("exposes a reproducible 300-case leveling evaluation contract", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/evaluation"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.evaluation.totalCases, 300);
  assert.equal(body.evaluation.methodology, "blind-scope-evidence-v1");
  assert.ok(body.evaluation.withinOneRate >= 90);
});

test("health contract reports the current safety boundary", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/health"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.status, "ok");
  assert.equal(body.providerStatus, "demo-only");
});

test("strategy contract fails closed when production mode is selected", async () => {
  const app = await worker();
  const previous = process.env.APP_MODE;
  process.env.APP_MODE = "production";
  try {
    const response = await app.fetch(new Request("http://localhost/api/strategy"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.mode, "production");
    assert.equal(body.compensation, null);
    assert.equal(body.horizons.length, 0);
  } finally {
    if (previous === undefined) delete process.env.APP_MODE;
    else process.env.APP_MODE = previous;
  }
});

test("profile parser accepts pasted text without fabricating missing skills", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/profile/parse", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: "Alex Chen\nMechanical engineer\nPython and CAD" }) }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.profile.name, "Alex Chen");
  assert.deepEqual(body.detectedSkills, ["Python", "CAD"]);
  assert.equal(body.profile.employment[0].company, "Garmin");
});

test("radar and network contracts expose explicit unavailable states", async () => {
  const app = await worker();
  const radar = await app.fetch(new Request("http://localhost/api/radar"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const network = await app.fetch(new Request("http://localhost/api/network"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const radarBody = await radar.json();
  const networkBody = await network.json();
  assert.ok(radarBody.items[0].evidence.includes("demo-profile-scope"));
  assert.equal(networkBody.profiles.length, 0);
  assert.match(networkBody.unavailable, /沒有已驗證/);
});

test("failure injection catalog covers every mandatory failure family", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/failure-injection"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.total, 12);
  assert.ok(body.cases.some((item) => item.id === "401" && item.expected === "unavailable"));
  assert.ok(body.cases.some((item) => item.id === "duplicate-profiles" && item.expected === "deduplicated"));
});

test("session and storage boundaries never expose raw identity or pretend persistence", async () => {
  const app = await worker();
  const session = await app.fetch(new Request("http://localhost/api/session", { headers: { "oai-authenticated-user-id": "user-secret-value" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const storage = await app.fetch(new Request("http://localhost/api/storage"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const sessionBody = await session.json();
  const storageBody = await storage.json();
  assert.equal(sessionBody.authenticated, true);
  assert.equal(sessionBody.subjectHash, "3d030d238d564028221c8e33");
  assert.doesNotMatch(JSON.stringify(sessionBody), /user-secret-value/);
  assert.equal(storage.status, 503);
  assert.equal(storageBody.durableStorage, false);
});

test("six acceptance personas are explicitly reported", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/acceptance"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.total, 6);
  assert.equal(body.personas.at(-1).id, "F");
  assert.ok(body.personas.every((persona) => persona.status === "PASS"));
  assert.ok(body.personas.every((persona) => Array.isArray(persona.evidence) && persona.evidence.length > 0));
  assert.match(body.overall, /DEMO_BOUNDARY/);
});

test("provider kill switch and canonical identity resolution are deterministic", async () => {
  const app = await worker();
  const previous = process.env.PROVIDER_DEMO_ENABLED;
  process.env.PROVIDER_DEMO_ENABLED = "false";
  try {
    const response = await app.fetch(new Request("http://localhost/api/providers"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
    const body = await response.json();
    assert.equal(body.states.every((state) => state.available === false), true);
  } finally {
    if (previous === undefined) delete process.env.PROVIDER_DEMO_ENABLED;
    else process.env.PROVIDER_DEMO_ENABLED = previous;
  }
  const { canonicalizeCompany } = await import("../app/canonical.ts");
  assert.equal(canonicalizeCompany("Garmin International").canonicalId, "company:garmin");
  assert.equal(canonicalizeCompany("台積電").canonicalId, "company:tsmc");
});

test("confidence uses provenance factors and worker responses carry operational IDs", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/health", { headers: { "x-request-id": "test-request", "x-analysis-run-id": "test-run" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.headers.get("x-request-id"), "test-request");
  assert.equal(response.headers.get("x-analysis-run-id"), "test-run");
  const { calculateConfidenceBreakdown, DEMO_EVIDENCE } = await import("../app/domain.ts");
  const breakdown = calculateConfidenceBreakdown([DEMO_EVIDENCE]);
  assert.equal(breakdown.evidenceCoverage, 88);
  assert.equal(breakdown.crossSourceAgreement, 85);
  assert.equal(breakdown.score, 74);
});

test("market value engine returns explainable demo dimensions and fails closed in production", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/market-value"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.mode, "demo");
  assert.equal(typeof body.marketValue.score, "number");
  assert.ok(body.marketValue.evidence.includes("deterministic-skill-and-scope-rules"));
});

test("job radar returns deterministic FIT and STRETCH gaps", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/radar"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual(body.items.map((item) => item.track), ["FIT", "STRETCH"]);
  assert.equal(typeof body.items[0].match, "number");
  assert.ok(Array.isArray(body.items[1].gaps));
  assert.ok(body.items.every((item) => item.evidence.includes("deterministic-role-skill-match")));
});

test("trajectory engine exposes small demo seed data without claiming 500 people", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/trajectory"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.sampleSize, 3);
  assert.equal(body.transitions[0].quality, "DEMO_INSUFFICIENT");
  assert.match(body.evidence, /insufficient/);
});

test("compensation contract exposes vesting-aware yearly totals", async () => {
  const app = await worker();
  const response = await app.fetch(new Request("http://localhost/api/compensation"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.compensation.years.length, 4);
  assert.equal(body.compensation.years[0].signOn, 150000);
  assert.equal(body.compensation.years[3].signOn, 0);
  assert.match(body.compensation.fourYearTotalFormatted, /NTD$/);
});
