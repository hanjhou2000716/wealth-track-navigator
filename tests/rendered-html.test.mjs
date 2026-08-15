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
  assert.match(html, /Your next move/i);
  assert.match(html, /WEALTH TRACK SCORE/i);
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
