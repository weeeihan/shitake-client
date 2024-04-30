import React, { useState, createContext, useEffect, useContext } from "react";
import { GamestateContext } from "./gamestate_provider";
import { Message } from "../utils/struct";
import * as handlers from "../utils/handlers";
type Conn = WebSocket | null;

export const WebsocketContext = createContext<{
  conn: Conn;
  setConn: (c: Conn) => void;
}>({
  conn: null,
  setConn: () => {},
});

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [conn, setConn] = useState<Conn>(null);
  const {
    player,
    setRoomData,
    setPlayerStatus,
    setPlayer,
    State,
    setIsAlready,
  } = useContext(GamestateContext);
  useEffect(() => {
    if (conn !== null) {
      console.log("HERE NIGGA!");
      conn.onmessage = (message) => {
        const m: Message = JSON.parse(message.data);
        console.log(m);

        // Someone joined
        if (m.state == State.REGISTERED || m.state == State.PLAYER_LEFT) {
          handlers.GetPlayer(player.id, setPlayerStatus, setPlayer);
          handlers.GetRoom(player.id, setPlayerStatus, setRoomData);
        }

        // Someone ready
        if (
          m.state == State.ALREADY ||
          m.state == State.UNREADY ||
          m.state == State.READY
        ) {
          handlers.GetPlayer(player.id, setPlayerStatus, setPlayer);
          handlers.GetRoom(player.id, setPlayerStatus, setRoomData);
          if (m.state == State.ALREADY) {
            setIsAlready(true);
          }
          if (m.state == State.UNREADY) {
            setIsAlready(false);
          }
        }
      };
    }
  }, [conn]);

  return (
    <WebsocketContext.Provider
      value={{
        conn: conn,
        setConn: setConn,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebSocketProvider;
