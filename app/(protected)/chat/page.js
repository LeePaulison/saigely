import ChatLayout from "@/components/chat/ChatLayout";

import { getConversations } from "@/graphql/conversation/conversations";

export default async function ChatPage() {
  const conversations = await getConversations();

  console.log("(Protected) Chat - conversations: ", conversations);

  return <ChatLayout conversations={conversations} />;
}
