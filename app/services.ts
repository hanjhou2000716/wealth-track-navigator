import type { Profile, TrustClaim } from "./domain";

export type ServiceMode = "demo" | "production";
export type ProviderErrorCode = "TIMEOUT" | "AUTH" | "FORBIDDEN" | "RATE_LIMIT" | "SERVER" | "MALFORMED" | "EMPTY";
export type ServiceResult<T> = { ok: true; data: T; claims: TrustClaim[] } | { ok: false; code: ProviderErrorCode; message: string; claims: TrustClaim[] };

export interface ProfileService { parse(text: string): Promise<ServiceResult<Profile>>; }
export interface LevelingService { normalize(profile: Profile): Promise<ServiceResult<{ level: string; confidence: number }>>; }
export interface EvidenceService { attach<T>(data: T, claims: TrustClaim[]): Promise<ServiceResult<T>>; }
export interface ProviderService { readonly mode: ServiceMode; query<T>(purpose: string, input: unknown): Promise<ServiceResult<T>>; }
export interface JobRadarService extends ProviderService {}
export interface AlumniService extends ProviderService {}
export interface TrajectoryService extends ProviderService {}
export interface CompensationService extends ProviderService {}
export interface StrategyService { plan(profile: Profile): Promise<ServiceResult<{ horizon: string; actions: string[] }[]>>; }
export interface ScoringService { score(profile: Profile): Promise<ServiceResult<{ score: number }>>; }

export interface LLMProvider { readonly model: string; generate<T>(input: unknown, schema: StructuredSchema<T>): Promise<ServiceResult<T>>; }
export type StructuredSchema<T> = { required: readonly (keyof T)[]; validate(value: unknown): value is T };

export function getServerLlmModel(value = process.env.LLM_MODEL): string { return value?.trim() || "unconfigured"; }
export function validateStructuredOutput<T>(value: unknown, schema: StructuredSchema<T>): ServiceResult<T> {
  return schema.validate(value) ? { ok: true, data: value, claims: [] } : { ok: false, code: "MALFORMED", message: "structured output failed schema validation", claims: [] };
}
