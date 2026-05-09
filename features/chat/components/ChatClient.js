"use client";

import { useEffect, useRef, useState } from "react";

import ChatLayout from "./ChatLayout";
import MessageList from "./MessageList";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export default function ChatClient() {
  const websocketRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Welcome to Saigely.",
    },
  ]);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:3000");

    websocketRef.current = websocket;

    websocket.onopen = () => {
      console.log("WebSocket connected");
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      console.log("WS Message:", message);

      if (message.type === "echo") {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: message.payload.content,
          },
        ]);
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

    setMessages((currentMessages) => [...currentMessages, userMessage]);

    websocketRef.current?.send(
      JSON.stringify({
        type: "chat_message",
        content,
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
