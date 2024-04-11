import { atom } from "recoil";

export const WebSocketAtom = atom({
  key: "/root/web/socket/atom",
  default: null as WebSocket | null,
});
