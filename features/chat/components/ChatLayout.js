"use client";

import { useConversationsStore } from "@/store/stores/conversationsStore";
import { useChatInitialization } from "@/hooks/useChatInitialization";

import { Header } from "./Header";
import { ChatClient } from "./ChatClient";
import { ConversationSidebar } from "./ConversationSidebar";

export default function ChatLayout({ conversations }) {
  const activeConversationId = useConversationsStore(
    (state) => state.activeConversationId,
  );

  const setActiveConversationId = useConversationsStore(
    (state) => state.setActiveConversationId,
  );

  useChatInitialization(conversations);

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <Header />
      <main className="flex flex-1 flex-row w-full min-h-0">
        <ConversationSidebar
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
        />

        <ChatClient
          activeConversationId={activeConversationId}
          setActiveConversationId={setActiveConversationId}
        />
      </main>
    </div>
  );
}
