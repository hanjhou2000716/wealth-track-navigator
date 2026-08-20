const USER_ID_HEADER = "oai-authenticated-user-id";

export type RequestIdentity = { authenticated: true; subjectHash: string } | { authenticated: false; subjectHash: null };

export async function readRequestIdentity(request: Request): Promise<RequestIdentity> {
  const raw = request.headers.get(USER_ID_HEADER);
  if (!raw) return { authenticated: false, subjectHash: null };
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  const subjectHash = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 24);
  return { authenticated: true, subjectHash };
}
