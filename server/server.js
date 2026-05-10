import http from "http";
import next from "next";
import "dotenv/config";

import { websocketServer } from "./websocket.js";
import { auth } from "../lib/auth/auth.js";

const dev = process.env.NODE_ENV !== "production";

const hostname = "localhost";
const port = 3000;

const nextApp = next({
  dev,
  hostname,
  port,
});

const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const httpServer = http.createServer((request, response) => {
    nextHandler(request, response);
  });

  httpServer.on("upgrade", async (request, socket, head) => {
    if (request.url !== "/ws") {
      return;
    }

    try {
      const requestHeaders = new Headers();

      if (request.headers.cookie) {
        requestHeaders.set("cookie", request.headers.cookie);
      }

      const session = await auth.api.getSession({
        headers: requestHeaders,
      });

      if (!session) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
      }

      request.session = session;

      websocketServer.handleUpgrade(request, socket, head, (websocket) => {
        websocketServer.emit("connection", websocket, request);
      });
    } catch (error) {
      console.error("WebSocket auth failed:", error);
      socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
      socket.destroy();
    }
  });

  httpServer.listen(port, () => {
    console.log(`> Server ready on http://${hostname}:${port}`);
  });
});
