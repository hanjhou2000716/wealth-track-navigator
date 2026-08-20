import type { ProviderErrorCode } from "./services";

export type FailureInjectionCase = { id: string; failure: string; expected: "empty-safe" | "unavailable" | "retryable" | "deduplicated" | "validated"; code?: ProviderErrorCode };
export const failureInjectionCases: FailureInjectionCase[] = [
  { id: "timeout", failure: "provider timeout", expected: "retryable", code: "TIMEOUT" }, { id: "429", failure: "rate limit", expected: "retryable", code: "RATE_LIMIT" },
  { id: "401", failure: "invalid credentials", expected: "unavailable", code: "AUTH" }, { id: "403", failure: "provider forbidden", expected: "unavailable", code: "FORBIDDEN" },
  { id: "500", failure: "provider server error", expected: "retryable", code: "SERVER" }, { id: "malformed-json", failure: "malformed JSON", expected: "validated", code: "MALFORMED" },
  { id: "empty-dataset", failure: "empty dataset", expected: "empty-safe", code: "EMPTY" }, { id: "duplicate-profiles", failure: "duplicate profiles", expected: "deduplicated" },
  { id: "missing-salary", failure: "missing salary", expected: "empty-safe" }, { id: "stale-salary", failure: "stale salary", expected: "unavailable" },
  { id: "unknown-company", failure: "unknown company", expected: "validated" }, { id: "ambiguous-management-role", failure: "ambiguous management role", expected: "validated" },
];
