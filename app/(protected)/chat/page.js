import ChatLayout from "@/features/chat/components/ChatLayout";

import { getConversations } from "@/lib/graphql/conversation/conversations";

export default async function ChatPage() {
  const conversations = await getConversations();

  console.log("(Protected) Chat - conversations: ", conversations);

  return <ChatLayout conversations={conversations} />;
}
