import React, { useState, createContext } from "react";
import { UserInfo } from "@/structs/structs";
type Conn = WebSocket | null;

export const WebsocketContext = createContext<{
  conn: Conn;
  setConn: (c: Conn) => void;
  user: UserInfo;
  setUser: (user: UserInfo) => void;
}>({
  conn: null,
  setConn: () => {},
  user: { name: "", roomID: "" },
  setUser: () => {},
});

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [conn, setConn] = useState<Conn>(null);
  const [user, setUser] = useState<UserInfo>({ name: "", roomID: "" });

  return (
    <WebsocketContext.Provider
      value={{
        conn: conn,
        setConn: setConn,
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebSocketProvider;
