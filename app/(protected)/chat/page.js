import ChatClient from "@/features/chat/components/ChatClient";
import { getSession } from "@/lib/auth/get-session";

export default async function ChatPage() {
  const session = await getSession();

  return <ChatClient />;
}
