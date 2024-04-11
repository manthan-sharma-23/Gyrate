import e from "express";
import { PORT } from "./config/exports";
import AppRouter from "./api/index.routes";
import SocketService from "./services/WebSocket/socket.service";
import http from "http";

// express api
const app = e();
app.use("/api", AppRouter);

// http server to serve websockets
const server = http.createServer(app);

// websocket server
const socketService = new SocketService(server);
const WebSocketServer = socketService.ws;
socketService.listenWebSocketEvents(WebSocketServer);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
