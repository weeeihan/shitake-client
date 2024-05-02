import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import { GamestateContext } from "./gamestate_provider";
import { Message, Player } from "../utils/struct";
import * as handlers from "../utils/handlers";
import { useLocation, useNavigate } from "react-router-dom";
import * as utils from "../utils/utils";
type Conn = WebSocket | null;

export const WebsocketContext = createContext<{
  conn: Conn;
  setConn: (c: Conn) => void;
}>({
  conn: null,
  setConn: () => {},
});

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [conn, setConn] = useState<Conn>(null);
  const { player, setRoomData, setPlayer, State, setIsAlready } =
    useContext(GamestateContext);

  const id = utils.GetID();
  // Fetch player and room data
  function fetchData() {
    if (id === "none" || id == "") {
      navigate("/");
      return;
    }
    handlers.GetPlayer(id, setPlayer, location.pathname, navigate);
    handlers.GetRoom(id, setRoomData, location.pathname, navigate);
  }

  useEffect(() => {
    if (player.id !== "" && conn == null) {
      handlers.ConnectToGame(player.id, setConn);
    }
  }, [player]);

  useEffect(() => {
    if (conn !== null) {
      conn.onmessage = (message) => {
        const m: Message = JSON.parse(message.data);
        console.log(m);

        // Someone joined
        if (m.state == State.REGISTERED || m.state == State.PLAYER_LEFT) {
          fetchData();
        }

        // Someone ready
        if (
          m.state == State.ALREADY ||
          m.state == State.UNREADY ||
          m.state == State.READY
        ) {
          fetchData();
          if (m.state == State.ALREADY) {
            setIsAlready(true);
          }
          if (m.state == State.UNREADY) {
            setIsAlready(false);
          }
        }

        // Start game!
        if (m.state == State.CHOOSE_CARD) {
          navigate("/game");
          fetchData();
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
