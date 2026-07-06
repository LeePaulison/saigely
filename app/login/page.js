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
    <main className="mx-auto flex min-h-screen w-full max-w-360 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Saigely</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A modern AI workspace featuring configurable AI models, persistent
            conversation history, and technical problem solving.
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-2 text-sm font-semibold">Features</h2>

          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Real-time response streaming</li>
            <li>Persistent conversation history</li>
            <li>Multiple AI models</li>
            <li>Configurable reasoning, verbosity & temperature</li>
            <li>Markdown & code support</li>
            <li>Secure Github & Google authentication</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleLogin({ provider: "github" })}
            className="rounded-md border border-ring px-4 py-3 hover:bg-surface cursor-pointer"
          >
            Continue with GitHub
          </button>

          <button
            onClick={() => handleLogin({ provider: "google" })}
            className="rounded-md border border-ring px-4 py-3 hover:bg-surface cursor-pointer"
          >
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Sign in to access your conversations and personalized AI preferences.
        </p>
      </div>
    </main>
  );
}
