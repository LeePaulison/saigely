import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/get-session";

export default async function ChatPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Welcome {session.user.name}</h1>
    </main>
  );
}
