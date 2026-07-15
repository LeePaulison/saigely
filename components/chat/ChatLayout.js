"use client";

import { useState, useEffect, useRef } from "react";

import { getConversation } from "@/graphql/conversation/conversation";
import { useConversationsStore } from "@/store/stores/conversationsStore";
import { useChatInitialization } from "@/hooks/useChatInitialization";
import { useChatSocket } from "@/hooks/useChatSocket";
import { parseTextAttachmentMessage } from "@/lib/chat/textAttachments";

import { Header } from "../ui/Header";
import { ChatClient } from "./ChatClient";
import { ConversationSidebar } from "./ConversationSidebar";

export default function ChatLayout({ conversations }) {
  const storedConversations = useConversationsStore(
    (state) => state.conversations,
  );

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
  const [chatStatus, setChatStatus] = useState("connecting");
  const savedStatusTimerRef = useRef(null);

  useChatInitialization(conversations);

  const { connected, send } = useChatSocket({
    onChatChunk: (payload) => {
      setChatStatus("responding");

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
      setChatStatus("saved");
      clearTimeout(savedStatusTimerRef.current);
      savedStatusTimerRef.current = setTimeout(() => {
        setChatStatus("ready");
      }, 1500);

      setActiveConversationId(payload.conversationId);

      const conversation = storedConversations.find(
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
    onError: (error) => {
      setChatStatus("error");
      console.error("Chat socket failed", error);
    },
  });

  useEffect(() => {
    return () => clearTimeout(savedStatusTimerRef.current);
  }, []);

  const composerStatus = connected
    ? chatStatus === "connecting"
      ? "ready"
      : chatStatus
    : chatStatus === "error"
      ? "error"
      : "connecting";

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
    const parsedMessage = parseTextAttachmentMessage(content);
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: parsedMessage.message,
      attachments: parsedMessage.attachments,
    };

    const assistantMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };

    const sent = send({
      type: "chat_message",
      payload: {
        content,
        conversationId: activeConversationId,
      },
    });

    if (!sent) {
      setChatStatus("error");
      return;
    }

    clearTimeout(savedStatusTimerRef.current);
    setChatStatus("generating");
    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage,
    ]);
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
        conversation.messages.map((message) => {
          const parsedMessage =
            message.role === "user"
              ? parseTextAttachmentMessage(message.content)
              : { message: message.content, attachments: [] };

          return {
            id: crypto.randomUUID(),
            ...message,
            content: parsedMessage.message,
            attachments: parsedMessage.attachments,
          };
        }),
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
          chatStatus={composerStatus}
        />
      </main>
    </div>
  );
}
