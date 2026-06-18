"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { getMe } from "@/lib/auth/auth";

export default function LoginPage() {
  const callbackURL = "http://localhost:3001/chat";
  const { data: session } = authClient.useSession();
  const router = useRouter();

  async function handleLogin({ provider }) {
    await authClient.signIn.social({
      provider: provider,
      callbackURL: callbackURL,
    });
  }

  useEffect(() => {
    if (!session) return;

    (async () => {
      const currentUser = await getMe();

      if (!currentUser.authenticated) {
        return;
      }

      router.replace("/chat");
    })();
  }, [session, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Saigely</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your AI workspace
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleLogin({ provider: "github" })}
            className="rounded-md border px-4 py-3 transition-colors hover:bg-accent"
          >
            Continue with GitHub
          </button>

          <button
            onClick={() => handleLogin({ provider: "google" })}
            className="rounded-md border px-4 py-3 transition-colors hover:bg-accent"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </main>
  );
}
