export type ProviderPurpose = "people" | "compensation" | "cost_of_living" | "jobs";
import { providerKillSwitch } from "./provider-contracts";

export type ProviderRegistration = {
  id: string;
  label: string;
  enabled: boolean;
  contractVerified: boolean;
  purposes: ProviderPurpose[];
  pii: { email: boolean; phone: boolean; address: boolean };
  retentionDays: number;
};

export const providerRegistry: ProviderRegistration[] = [
  { id: "demo", label: "Demo Provider", enabled: true, contractVerified: true, purposes: ["people", "compensation", "cost_of_living", "jobs"], pii: { email: false, phone: false, address: false }, retentionDays: 0 },
  { id: "licensed-people", label: "Licensed People Provider", enabled: false, contractVerified: false, purposes: ["people"], pii: { email: false, phone: false, address: false }, retentionDays: 0 },
  { id: "licensed-compensation", label: "Licensed Compensation Provider", enabled: false, contractVerified: false, purposes: ["compensation", "cost_of_living"], pii: { email: false, phone: false, address: false }, retentionDays: 0 },
];

export function canQueryProduction(provider: ProviderRegistration, purpose: ProviderPurpose): boolean {
  return providerKillSwitch(provider.id) && provider.enabled && provider.contractVerified && provider.purposes.includes(purpose) && !provider.pii.email && !provider.pii.phone && !provider.pii.address;
}

export function providerState(mode: "demo" | "production", purpose: ProviderPurpose) {
  const available = providerRegistry.filter((provider) => provider.purposes.includes(purpose) && providerKillSwitch(provider.id) && (mode === "demo" ? provider.id === "demo" : provider.id !== "demo" && canQueryProduction(provider, purpose)));
  return { mode, purpose, available: available.length > 0, providers: available.map(({ id, label }) => ({ id, label })) };
}
