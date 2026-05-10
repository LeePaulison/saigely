"use client";

import { useEffect, useRef, useState } from "react";

import { getConversation } from "../api/getConversation";

import ChatLayout from "./ChatLayout";
import MessageList from "./MessageList";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export default function ChatClient() {
  const websocketRef = useRef(null);
  const [activeConversationId, setActiveConversationId] = useState(null);

  console.log("ActiveConversationId: ", activeConversationId);

  useEffect(() => {
    if (!activeConversationId) {
      return;
    }

    localStorage.setItem("activeConversationId", activeConversationId);
  }, [activeConversationId]);

  useEffect(() => {
    const savedConversationId = localStorage.getItem("activeConversationId");

    if (savedConversationId) {
      setActiveConversationId(savedConversationId);
    }
  }, []);

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

  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Welcome to Saigely.",
    },
  ]);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:3000/ws");

    websocketRef.current = websocket;

    websocket.onopen = () => {
      console.log("WebSocket connected");
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      console.log("WS Message:", message);

      if (message.type === "chat_chunk") {
        setMessages((currentMessages) => {
          return currentMessages.map((currentMessage, index) => {
            const isLastMessage = index === currentMessages.length - 1;

            if (isLastMessage && currentMessage.role === "assistant") {
              return {
                ...currentMessage,
                content: currentMessage.content + message.payload.content,
              };
            }

            return currentMessage;
          });
        });
      }

      if (message.type === "chat_complete") {
        setActiveConversationId(message.payload.conversationId);
      }
    };

    websocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      websocket.close();
    };
  }, []);

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

    websocketRef.current?.send(
      JSON.stringify({
        type: "chat_message",

        payload: {
          conversationId: activeConversationId,
          content,
        },
      }),
    );
  }
  return (
    <ChatLayout>
      <MessageList>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
      </MessageList>

      <ChatInput onSendMessage={handleSendMessage} />
    </ChatLayout>
  );
}
