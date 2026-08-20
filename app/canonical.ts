export type CanonicalEntity = { canonicalId: string; canonicalName: string; aliases: string[] };

const companyAliases: Record<string, string[]> = {
  garmin: ["garmin", "garmin ltd.", "garmin international", "garmin taiwan"],
  tsmc: ["tsmc", "taiwan semiconductor manufacturing company", "台積電"],
};

function normalized(value: string): string { return value.trim().toLowerCase().replace(/[.,()\-_/]+/g, " ").replace(/\s+/g, " "); }

export function canonicalizeCompany(value: string): CanonicalEntity {
  const key = normalized(value);
  const found = Object.entries(companyAliases).find(([, aliases]) => aliases.some((alias) => normalized(alias) === key));
  if (!found) return { canonicalId: `company:${key.replace(/\s+/g, "-")}`, canonicalName: value.trim(), aliases: [value.trim()] };
  return { canonicalId: `company:${found[0]}`, canonicalName: found[0] === "tsmc" ? "TSMC" : "Garmin", aliases: found[1] };
}
