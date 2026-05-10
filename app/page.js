import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

import Link from "next/link";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/chat");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Link href="/login" className="rounded border px-4 py-2">
        Login
      </Link>
    </main>
  );
}
