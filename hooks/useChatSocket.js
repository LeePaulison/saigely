"use client";

import { useEffect, useRef, useState } from "react";

export const useChatSocket = ({ onChatChunk, onChatComplete, onError }) => {
  const websocketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const websocket = new WebSocket(process.env.NEXT_PUBLIC_WS_SERVER);

    websocketRef.current = websocket;

    websocket.onopen = () => {
      console.log("WebSocket connected");
      setConnected(true);
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case "chat_chunk":
          onChatChunk?.(message.payload);
          break;

        case "chat_complete":
          onChatComplete?.(message.payload);
          break;

        default:
          console.warn("Unknown WS message:", message.type);
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      onError?.(error);
    };

    websocket.onclose = (event) => {
      console.log("WebSocket closed", {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
      });

      setConnected(false);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const send = (message) => {
    if (!websocketRef.current) return;

    websocketRef.current.send(JSON.stringify(message));
  };

  return {
    connected,
    send,
  };
};
