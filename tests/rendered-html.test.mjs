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
