"use client";

import { useEffect, useRef, useState } from "react";

export const useChatSocket = ({ onChatChunk, onChatComplete, onError }) => {
  const websocketRef = useRef(null);
  const authenticatedRef = useRef(false);
  const callbacksRef = useRef({ onChatChunk, onChatComplete, onError });
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    callbacksRef.current = { onChatChunk, onChatComplete, onError };
  }, [onChatChunk, onChatComplete, onError]);

  useEffect(() => {
    const abortController = new AbortController();
    let cancelled = false;
    let websocket;

    async function connect() {
      try {
        const response = await fetch("/api/auth/token", {
          credentials: "include",
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(
            `WebSocket token request failed with status ${response.status}`,
          );
        }

        const { token } = await response.json();

        if (!token) {
          throw new Error("WebSocket token response did not include a token");
        }

        if (cancelled) {
          return;
        }

        const websocketUrl = process.env.NEXT_PUBLIC_WS_SERVER;

        if (!websocketUrl) {
          throw new Error("NEXT_PUBLIC_WS_SERVER is not defined");
        }

        websocket = new WebSocket(websocketUrl);
        websocketRef.current = websocket;

        websocket.onopen = () => {
          websocket.send(
            JSON.stringify({
              type: "authenticate",
              payload: { token },
            }),
          );
        };

        websocket.onmessage = (event) => {
          let message;

          try {
            message = JSON.parse(event.data);
          } catch {
            callbacksRef.current.onError?.(
              new Error("WebSocket server sent invalid JSON"),
            );
            return;
          }

          switch (message.type) {
            case "authenticated":
              authenticatedRef.current = true;
              setConnected(true);
              break;

            case "authentication_error":
              callbacksRef.current.onError?.(
                new Error(message.payload?.message || "Authentication failed"),
              );
              break;

            case "chat_chunk":
              callbacksRef.current.onChatChunk?.(message.payload);
              break;

            case "chat_complete":
              callbacksRef.current.onChatComplete?.(message.payload);
              break;

            default:
              console.warn("Unknown WS message:", message.type);
          }
        };

        websocket.onerror = (error) => {
          console.error("WebSocket error:", error);
          callbacksRef.current.onError?.(error);
        };

        websocket.onclose = (event) => {
          console.log("WebSocket closed", {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean,
          });

          authenticatedRef.current = false;
          websocketRef.current = null;
          setConnected(false);
        };
      } catch (error) {
        if (error.name !== "AbortError") {
          callbacksRef.current.onError?.(error);
        }
      }
    }

    connect();

    return () => {
      cancelled = true;
      abortController.abort();
      authenticatedRef.current = false;
      websocketRef.current = null;
      websocket?.close();
    };
  }, []);

  const send = (message) => {
    const websocket = websocketRef.current;

    if (
      !authenticatedRef.current ||
      !websocket ||
      websocket.readyState !== WebSocket.OPEN
    ) {
      return false;
    }

    websocket.send(JSON.stringify(message));
    return true;
  };

  return {
    connected,
    send,
  };
};
