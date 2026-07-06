"use client";

import { useState, useEffect } from "react";

import { getConversation } from "@/graphql/conversation/conversation";
import { useConversationsStore } from "@/store/stores/conversationsStore";
import { useChatInitialization } from "@/hooks/useChatInitialization";
import { useChatSocket } from "@/hooks/useChatSocket";

import { Header } from "../ui/Header";
import { ChatClient } from "./ChatClient";
import { ConversationSidebar } from "./ConversationSidebar";

export default function ChatLayout({ conversations }) {
  const activeConversationId = useConversationsStore(
    (state) => state.activeConversationId,
  );

  const setActiveConversationId = useConversationsStore(
    (state) => state.setActiveConversationId,
  );

  const updateConversation = useConversationsStore(
    (state) => state.updateConversation,
  );

  const addConversation = useConversationsStore(
    (state) => state.addConversation,
  );

  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Welcome to Saigely.",
    },
  ]);

  useChatInitialization(conversations);

  const { connected, send } = useChatSocket({
    onChatChunk: (payload) => {
      setMessages((currentMessages) => {
        return currentMessages.map((currentMessage, index) => {
          const isLastMessage = index === currentMessages.length - 1;

          if (isLastMessage && currentMessage.role === "assistant") {
            return {
              ...currentMessage,
              content: currentMessage.content + payload.content,
            };
          }

          return currentMessage;
        });
      });
    },

    onChatComplete: (payload) => {
      setActiveConversationId(payload.conversationId);

      const conversation = conversations.find(
        (conversation) => conversation.id === payload.conversationId,
      );

      if (conversation) {
        updateConversation(payload.conversationId, {
          preview: payload.preview,
          updatedAt: payload.updatedAt,
        });
      } else {
        addConversation({
          id: payload.conversationId,
          preview: payload.preview,
          updatedAt: payload.updatedAt,
        });
      }
    },
  });

  function handleNewConversation() {
    setActiveConversationId(null);

    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Welcome to Saigely.",
      },
    ]);
  }

  function handleSendMessage(content) {
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    const assistantMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage,
    ]);

    send({
      type: "chat_message",
      payload: {
        content,
        conversationId: activeConversationId,
      },
    });
  }

  useEffect(() => {
    async function hydrateConversation() {
      if (!activeConversationId) {
        return;
      }

      const conversation = await getConversation(activeConversationId);

      if (!conversation) {
        return;
      }

      setMessages(
        conversation.messages.map((message) => ({
          id: crypto.randomUUID(),
          ...message,
        })),
      );
    }

    hydrateConversation();
  }, [activeConversationId]);

  return (
    <div className="flex flex-col w-full h-full max-w-360 mx-auto">
      <Header />
      <main className="flex flex-1 flex-row w-full min-h-0">
        <ConversationSidebar
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
          onNewConversation={handleNewConversation}
        />

        <ChatClient
          activeConversationId={activeConversationId}
          messages={messages}
          handleSendMessage={handleSendMessage}
        />
      </main>
    </div>
  );
}
