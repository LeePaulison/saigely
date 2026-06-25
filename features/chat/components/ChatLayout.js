"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/stores/userStore";
import { useConversationsStore } from "@/store/stores/conversationsStore";
import { getPreferences } from "@/lib/graphql/preference/preference";

import { ChatClient } from "./ChatClient";
import { ConversationSidebar } from "./ConversationSidebar";

export default function ChatLayout({ conversations }) {
  const currentUser = useUserStore((state) => state.user);
  const activeConversationId = useConversationsStore(
    (state) => state.activeConversationId,
  );

  const setActiveConversationId = useConversationsStore(
    (state) => state.setActiveConversationId,
  );

  const setConversations = useConversationsStore(
    (state) => state.setConversations,
  );

  useEffect(() => {
    setConversations(conversations);

    const storedConversationId = localStorage.getItem("activeConversationId");

    if (!storedConversationId) {
      return;
    }

    const exists = conversations.some(
      (conversation) => conversation.id === storedConversationId,
    );

    if (exists) {
      setActiveConversationId(storedConversationId);
    }
  }, [conversations, setActiveConversationId, setConversations]);

  useEffect(() => {
    if (!activeConversationId) {
      return;
    }

    localStorage.setItem("activeConversationId", activeConversationId);
  }, [activeConversationId]);

  useEffect(() => {
    (async () => {
      const result = await getPreferences();
      console.log(result);
    })();
  }, []);

  return (
    <main className="flex h-screen w-full flex-row bg-background text-foreground">
      <ConversationSidebar
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
      />

      <ChatClient
        activeConversationId={activeConversationId}
        setActiveConversationId={setActiveConversationId}
      />
    </main>
  );
}
