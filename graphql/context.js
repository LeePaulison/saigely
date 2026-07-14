// graphql/context.js

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export async function createContext() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    authenticated: !!session,
    session: session?.session ?? null,
    user: session?.user ?? null,
  };
}
