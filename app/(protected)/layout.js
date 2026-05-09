import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/get-session";

export default async function ProtectedLayout({ children }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <div>{children}</div>;
}
