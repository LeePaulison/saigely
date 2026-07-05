"use client";

import { useEffect, useRef, useState } from "react";

import { getConversation } from "@/graphql/conversation/conversation";
import { useChatSocket } from "@/hooks/useChatSocket";

import { ScrollArea } from "radix-ui";

import MessageList from "./MessageList";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export const ChatClient = ({
  activeConversationId,
  setActiveConversationId,
}) => {
  const websocketRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Welcome to Saigely.",
    },
  ]);

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
    },
  });

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

  return (
    <div className="flex flex-col w-full h-full">
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <MessageList>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
              />
            ))}
          </MessageList>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner" />
      </ScrollArea.Root>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};
