import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useRef,
} from "react";
import { GamestateContext } from "./gamestate_provider";
import { Message, Player } from "../utils/struct";
import * as handlers from "../utils/handlers";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import * as utils from "../utils/utils";
import { CONNECT_API } from "../utils/api";
type Conn = WebSocket | null;

export const WebsocketContext = createContext<{
  conn: Conn;
  setConn: (c: Conn) => void;
  countDown: number;
}>({
  conn: null,
  setConn: () => {},
  countDown: 0,
});

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countDown, setCountDown] = useState<number>(0);
  const [conn, setConn] = useState<Conn>(null);
  const connRef = useRef<Conn>(null);
  const {
    player,
    setRoomData,
    setPlayer,
    State,
    setIsAlready,
    bottomDisp,
    setBottomDisp,
  } = useContext(GamestateContext);

  const id = utils.GetID();
  // Fetch player and room data
  function fetchData() {
    handlers.GetPlayer(id, setPlayer);
    handlers.GetRoom(id, setRoomData);
  }

  // let x = 1;

  useEffect(() => {
    // To ensure that there is only 1 connection
    if (
      location.pathname !== "/" &&
      (!connRef.current || connRef.current.readyState === WebSocket.CLOSED)
    ) {
      handlers.ConnectToGame(id, setConn, connRef);
    }

    return () => {
      if (connRef.current && connRef.current.readyState === WebSocket.OPEN) {
        connRef.current.close();
      }
    };

    // return () => {
    //   if (conn?.readyState === 1) {
    //     conn.close();
    //   }
    // };
  }, [location]);

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
          setIsAlready(false);
          fetchData();
        }

        // GAME PHASE
        if (m.state == State.COUNT) {
          setCountDown(parseInt(m.remark));
        }

        if (m.state == State.PROCESS) {
          fetchData();
          setBottomDisp("Playing");
        }

        if (m.state == State.CHOOSE_ROW) {
          fetchData();
        }

        if (m.state == State.ROW_SELECTED) {
          fetchData();
          setBottomDisp("Playing");
        }

        // ROUND END
        if (m.state == State.ROUND_END) {
          navigate("/roundend");
        }

        if (m.state == State.GAME_END) {
          navigate("/gameend");
        }
      };
      conn.onclose = (event) => {
        console.log("Connection closed due to ", event.reason);
        setConn(null);
        navigate("/");
      };
    }
    return () => {
      if (conn !== null) {
        console.log("CLOSING CONN");
        conn.close();
      }
    };
  }, [conn]);

  return (
    <WebsocketContext.Provider
      value={{
        conn: conn,
        setConn: setConn,
        countDown: countDown,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebSocketProvider;
