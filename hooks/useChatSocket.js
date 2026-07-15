"use client";

import { useEffect, useRef, useState } from "react";
import { decodeJwt } from "jose";

import { authClient } from "@/lib/auth/auth-client";

const TOKEN_REFRESH_BUFFER_MS = 30_000;

function getTokenExpiration(token) {
  try {
    const { exp } = decodeJwt(token);

    return typeof exp === "number" ? exp * 1000 : null;
  } catch {
    return null;
  }
}

export const useChatSocket = ({ onChatChunk, onChatComplete, onError }) => {
  const websocketRef = useRef(null);
  const authenticatedRef = useRef(false);
  const callbacksRef = useRef({ onChatChunk, onChatComplete, onError });
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    callbacksRef.current = { onChatChunk, onChatComplete, onError };
  }, [onChatChunk, onChatComplete, onError]);

  useEffect(() => {
    let cancelled = false;
    let websocket;
    let refreshTimeout;

    async function connect() {
      try {
        const { data, error } = await authClient.token();

        if (error) {
          throw new Error(error.message || "WebSocket token request failed");
        }

        const token = data?.token;

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

        const socket = new WebSocket(websocketUrl);
        websocket = socket;
        websocketRef.current = socket;

        const isCurrentSocket = () =>
          !cancelled && websocketRef.current === socket;

        socket.onopen = () => {
          if (!isCurrentSocket()) {
            return;
          }

          socket.send(
            JSON.stringify({
              type: "authenticate",
              payload: { token },
            }),
          );
        };

        socket.onmessage = (event) => {
          if (!isCurrentSocket()) {
            return;
          }

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

              clearTimeout(refreshTimeout);

              const expiresAt = getTokenExpiration(token);
              const refreshDelay = expiresAt
                ? Math.max(0, expiresAt - Date.now() - TOKEN_REFRESH_BUFFER_MS)
                : 4 * 60 * 1000;

              refreshTimeout = setTimeout(() => {
                if (isCurrentSocket()) {
                  socket.close(4000, "Refreshing authentication");
                }
              }, refreshDelay);
              break;

            case "authentication_error":
              authenticatedRef.current = false;
              setConnected(false);
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

        socket.onerror = (error) => {
          if (!isCurrentSocket()) {
            return;
          }

          console.error("WebSocket error:", error);
          callbacksRef.current.onError?.(error);
        };

        socket.onclose = (event) => {
          if (!isCurrentSocket()) {
            return;
          }

          console.log("WebSocket closed", {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean,
          });

          authenticatedRef.current = false;
          websocketRef.current = null;
          setConnected(false);

          clearTimeout(refreshTimeout);

          if (event.code === 4000) {
            connect();
          }
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
      clearTimeout(refreshTimeout);

      if (websocket) {
        websocket.onopen = null;
        websocket.onmessage = null;
        websocket.onerror = null;
        websocket.onclose = null;

        if (
          websocket.readyState === WebSocket.OPEN ||
          websocket.readyState === WebSocket.CONNECTING
        ) {
          websocket.close();
        }
      }

      if (websocketRef.current === websocket) {
        authenticatedRef.current = false;
        websocketRef.current = null;
        setConnected(false);
      }
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
