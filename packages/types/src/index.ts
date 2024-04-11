import { WebSocket } from "ws";
export interface SocketMessage {
  type: "JOIN" | "INFO" | "REGISTER" | "NOTIFICATION" | "MESSAGE" | "ALERT";
  payload: any;
}

export const _redis_channels = {
  general: "GENERAL",
  notification: "notification",
};

export interface user_register_payload {
  userId: string;
}

export interface root_users_map {
  socket: WebSocket;
  userId: string;
}

export const forumsOrder = {
  recent: "recent",
  relevant: "relevant",
  trending: "trending",
};
