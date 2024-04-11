import { WebSocketAtom } from "@/features/store/atom/root/ws.atom";
import { UserAtom } from "@/features/store/atom/user/user.atom";
import { WS_URL } from "@/utils/config/config";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { SocketMessage } from "types";

export const useWideWebSocket = () => {
  const [ws, setWs] = useRecoilState(WebSocketAtom);
  const user = useRecoilValue(UserAtom);

  useEffect(() => {
    if (user) {
      const wsInstance = new WebSocket(WS_URL);

      wsInstance.onopen = () => {
        const register_user: SocketMessage = {
          type: "REGISTER",
          payload: {
            userId: user.id,
          },
        };

        setWs(wsInstance);

        wsInstance.send(JSON.stringify(register_user));
      };
    }

    return () => {
      setWs(null);
    };
  }, [WS_URL, user]);

  return ws;
};
