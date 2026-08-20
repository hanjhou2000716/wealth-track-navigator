import { readRequestIdentity } from "../../request-identity";

export async function GET(request: Request) {
  const identity = await readRequestIdentity(request);
  return Response.json({ ...identity, signInPath: identity.authenticated ? null : "/signin-with-chatgpt?return_to=/" });
}
