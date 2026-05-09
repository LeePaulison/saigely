import http from "http";
import next from "next";

import { initializeWebSocketServer } from "../lib/websocket/websocket.js";

const dev = process.env.NODE_ENV !== "production";

const hostname = "localhost";
const port = process.env.NEXT_PUBLIC_WS_SERVER_PORT || 3000;

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

  initializeWebSocketServer(httpServer);

  httpServer.listen(port, () => {
    console.log(`> Server ready on http://${hostname}:${port}`);
  });
});
