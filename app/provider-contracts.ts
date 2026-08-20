import type { Employment, Profile } from "./domain";
import type { ProviderErrorCode, ServiceResult } from "./services";

export type PeopleSearchQuery = { companyId?: string; schoolId?: string; role?: string; region?: string };
export type PersonSearchResult = { ids: string[]; sampleSize: number };
export type PersonProfile = { id: string; role: string; company: string; evidenceId: string };

export interface PeopleProvider {
  searchPeople(query: PeopleSearchQuery): Promise<ServiceResult<PersonSearchResult>>;
  getPerson(id: string): Promise<ServiceResult<PersonProfile>>;
  getCareerHistory(id: string): Promise<ServiceResult<Employment[]>>;
  searchByCompany(companyId: string): Promise<ServiceResult<PersonSearchResult>>;
  searchByEducation(schoolId: string): Promise<ServiceResult<PersonSearchResult>>;
}

export interface LicensedPeopleProviderAdapter extends PeopleProvider {
  readonly providerId: string;
  readonly contractVerified: boolean;
}

export type ProviderPolicyDecision = { allowed: boolean; reason: string; code?: ProviderErrorCode };

export function providerPolicyGuard(input: { mode: "demo" | "production"; enabled: boolean; contractVerified: boolean; piiAllowed: boolean }): ProviderPolicyDecision {
  if (!input.enabled) return { allowed: false, reason: "provider disabled by runtime kill switch", code: "FORBIDDEN" };
  if (input.mode === "production" && !input.contractVerified) return { allowed: false, reason: "provider contract is not verified", code: "FORBIDDEN" };
  if (input.piiAllowed) return { allowed: false, reason: "PII policy rejects this provider", code: "FORBIDDEN" };
  return { allowed: true, reason: "provider policy passed" };
}

export function providerKillSwitch(providerId: string, env = process.env): boolean {
  const key = `PROVIDER_${providerId.replace(/[^A-Za-z0-9]/g, "_").toUpperCase()}_ENABLED`;
  return env[key] !== "false";
}

export class DemoPeopleProvider implements PeopleProvider {
  async searchPeople(): Promise<ServiceResult<PersonSearchResult>> { return { ok: true, data: { ids: [], sampleSize: 0 }, claims: [] }; }
  async getPerson(id: string): Promise<ServiceResult<PersonProfile>> { return { ok: false, code: "EMPTY", message: `demo people record unavailable: ${id}`, claims: [] }; }
  async getCareerHistory(): Promise<ServiceResult<Employment[]>> { return { ok: true, data: [], claims: [] }; }
  async searchByCompany(): Promise<ServiceResult<PersonSearchResult>> { return { ok: true, data: { ids: [], sampleSize: 0 }, claims: [] }; }
  async searchByEducation(): Promise<ServiceResult<PersonSearchResult>> { return { ok: true, data: { ids: [], sampleSize: 0 }, claims: [] }; }
}

export type ProfileProviderOutput = { profile: Profile; source: "user-supplied" | "licensed" | "demo" };
