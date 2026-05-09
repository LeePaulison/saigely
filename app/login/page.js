"use client";

import { authClient } from "@/lib/auth/auth-client";

export default function LoginPage() {
  const callbackURL = "/chat";

  async function handleLogin({ provider }) {
    await authClient.signIn.social({
      provider: provider,
      callbackURL: callbackURL,
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center gap-6">
      <button
        onClick={() => handleLogin({ provider: "github" })}
        className="rounded border px-4 py-2"
      >
        Login with GitHub
      </button>
      <button
        onClick={() => handleLogin({ provider: "google" })}
        className="rounded border px-4 py-2"
      >
        Login with Google
      </button>
    </main>
  );
}
