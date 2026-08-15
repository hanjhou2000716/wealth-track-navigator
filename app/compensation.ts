export type Region = "TW" | "US" | "SG" | "JP";
export type VestingYear = { year: number; equity: number; bonus: number; signOn: number };

export type CompensationInput = {
  base: number;
  annualBonusRate: number;
  equity: number;
  vesting: number[];
  signOn: number;
  region: Region;
  currency: string;
};

const colMultiplier: Record<Region, number | null> = { TW: 1, US: 1.55, SG: 1.42, JP: 1.18 };

export function calculateCompensation(input: CompensationInput): { years: VestingYear[]; fourYearTotal: number; colAdjustedTotal: number | null; realIndex: number | null; evidenceRequired: boolean } {
  const years = [1, 2, 3, 4].map((year) => ({ year, equity: input.equity * (input.vesting[year - 1] ?? 0), bonus: input.base * input.annualBonusRate, signOn: year === 1 ? input.signOn : 0 }));
  const fourYearTotal = years.reduce((sum, item) => sum + input.base + item.equity + item.bonus + item.signOn, 0);
  const multiplier = colMultiplier[input.region];
  return { years, fourYearTotal, colAdjustedTotal: multiplier === null ? null : fourYearTotal / multiplier, realIndex: multiplier === null ? null : Math.round((fourYearTotal / multiplier / input.base / 4) * 100), evidenceRequired: multiplier === null };
}

export function formatCompensation(value: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value) + ` ${currency}`;
}
