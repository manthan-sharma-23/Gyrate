import { WebSocket, WebSocketServer } from "ws";
import http from "http";
import { SocketMessage, root_users_map, user_register_payload } from "types";
import RedisService from "../Redis/RedisService";

export default class SocketService {
  private _wss: WebSocketServer;
  private _counter = 0;
  private _root_users = new Map<number, root_users_map>();

  constructor(server: http.Server) {
    this._wss = new WebSocketServer({ server });
  }

  public listenWebSocketEvents(wss: WebSocketServer) {
    wss.on("connection", (socket) => {
      const socketId = this._counter++;

      socket.on("message", (msg) => {
        const message: SocketMessage = JSON.parse(msg.toString());

        this._manage_message_events(socketId, socket, message);
      });
    });

    wss.on("close", () => {
      this._root_users.clear();
    });
  }

  private _manage_message_events(
    socketId: number,
    socket: WebSocket,
    message: SocketMessage
  ) {
    if (message.type === "REGISTER") {
      const payload: user_register_payload = <user_register_payload>(
        message.payload
      );
      this._root_users.set(socketId, { userId: payload.userId, socket });
    }
  }

  get ws() {
    return this._wss;
  }

  get no_of_users() {
    return this._root_users.size;
  }
}
