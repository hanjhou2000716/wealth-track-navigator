export type AcceptancePersona = { id: string; scenario: string; expected: string; status: "PASS" | "NOT_READY" };

export const acceptancePersonas: AcceptancePersona[] = [
  { id: "A", scenario: "Garmin Mechanical Engineer → Apple Senior Product Design", expected: "complete demo strategy flow with explicit evidence", status: "PASS" },
  { id: "B", scenario: "TSMC Equipment Engineer → international semiconductor role", expected: "role-family normalization and provider-gated radar", status: "PASS" },
  { id: "C", scenario: "cross-domain candidate", expected: "transferable capital remains separate from facts", status: "PASS" },
  { id: "D", scenario: "no external Provider data", expected: "normal empty-safe degradation", status: "PASS" },
  { id: "E", scenario: "Provider API failure", expected: "unavailable or retryable state, never fake data", status: "PASS" },
  { id: "F", scenario: "malformed or incomplete resume", expected: "validation response without crash", status: "PASS" },
];
