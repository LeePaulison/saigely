import ChatLayout from "@/features/chat/components/ChatLayout";

import { getUserConversationList } from "@/server/services/conversationService";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function ChatPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const conversations = await getUserConversationList(session.user.id);

  return <ChatLayout conversations={conversations} />;
}
