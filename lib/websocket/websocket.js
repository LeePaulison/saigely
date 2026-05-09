import { WebSocketServer } from "ws";

let websocketServer;

export function initializeWebSocketServer(server) {
  if (websocketServer) {
    return websocketServer;
  }

  websocketServer = new WebSocketServer({
    server,
  });

  websocketServer.on("connection", (socket) => {
    console.log("WebSocket connected");

    socket.send(
      JSON.stringify({
        type: "connected",
      }),
    );

    socket.on("message", (message) => {
      console.log("Received:", message.toString());

      socket.send(
        JSON.stringify({
          type: "echo",
          payload: message.toString(),
        }),
      );
    });

    socket.on("close", () => {
      console.log("WebSocket disconnected");
    });
  });

  return websocketServer;
}
