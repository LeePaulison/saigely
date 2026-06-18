import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { UserProvider } from "@/providers/UserProvider";

export default async function ProtectedLayout({ children }) {
  const currentUser = await getCurrentUser();

  if (!currentUser.authenticated) {
    return redirect("/login");
  }

  return <UserProvider user={currentUser.user}>{children}</UserProvider>;
}
