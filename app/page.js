import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Link href="/login" className="rounded border px-4 py-2">
        Login
      </Link>
    </main>
  );
}
