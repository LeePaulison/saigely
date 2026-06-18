"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/stores/userStore";

import { ChatClient } from "./ChatClient";
import { ConversationSidebar } from "./ConversationSidebar";

export default function ChatLayout() {
  const currentUser = useUserStore((state) => state.user);
  console.log("ChatLayout - currentUser: ", currentUser);
  const [activeConversationId, setActiveConversationId] = useState(null);

  useEffect(() => {
    const savedConversationId = localStorage.getItem("activeConversationId");

    if (savedConversationId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveConversationId(savedConversationId);
    }
  }, []);

  useEffect(() => {
    if (!activeConversationId) {
      return;
    }

    localStorage.setItem("activeConversationId", activeConversationId);
  }, [activeConversationId]);

  return (
    <main className="flex h-screen w-full flex-row bg-background text-foreground">
      <ConversationSidebar
        conversations={[]}
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
