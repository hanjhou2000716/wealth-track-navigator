const requiredProductionSecrets = [
  ["PRODUCTION_PROVIDER_LICENSE_VERIFIED", "a verified licensed provider contract"],
  ["D1_DATABASE_ID", "a D1 database binding"],
  ["AUTH_SECRET", "server-side authentication configuration"],
  ["LLM_API_KEY", "a server-side LLM credential"],
];

const mode = String(process.env.READINESS_MODE || "demo").toLowerCase();

if (mode === "demo") {
  console.log("deployment readiness passed: demo/fail-closed artifact");
  process.exit(0);
}

if (mode !== "production") {
  console.error(`deployment readiness failed: unsupported mode '${mode}'`);
  process.exit(1);
}

const missing = requiredProductionSecrets
  .filter(([name]) => !String(process.env[name] || "").trim())
  .map(([name, description]) => `${name} (${description})`);

if (missing.length > 0) {
  console.error("deployment readiness failed: production credentials are incomplete");
  for (const item of missing) console.error(`- missing ${item}`);
  process.exit(1);
}

if (String(process.env.PRODUCTION_PROVIDER_LICENSE_VERIFIED).toLowerCase() !== "true") {
  console.error("deployment readiness failed: provider license verification must be true");
  process.exit(1);
}

console.log("deployment readiness passed: production prerequisites are present");
