import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useRef,
} from "react";
import { GamestateContext } from "./gamestate_provider";
import { Message } from "../utils/struct";
import * as handlers from "../utils/handlers";
import { useLocation, useNavigate } from "react-router-dom";
import * as utils from "../utils/utils";
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
    setGameData,
    setGameStates,
    gameConstants: { State },
  } = useContext(GamestateContext);

  const id = utils.GetID();
  // Fetch player and room data
  function fetchData() {
    handlers.GetPlayer(id, setGameData);
    handlers.GetRoom(id, setGameData);
  }
  // let x = 1;

  useEffect(() => {
    // To ensure that there is only 1 connection
    if (
      location.pathname !== "/" &&
      conn === null &&
      (!connRef.current || connRef.current.readyState === WebSocket.CLOSED) &&
      location.pathname !== "/test"
    ) {
      // console.log("DID I TRY?");
      handlers.ConnectToGame(id, setConn, connRef);
    }

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
            setGameStates((prev) => ({
              ...prev,
              isAlready: true,
            }));
          }
          if (m.state == State.UNREADY) {
            setGameStates((prev) => ({
              ...prev,
              isAlready: false,
            }));
          }
        }

        // Start game!
        if (m.state == State.START) {
          // fetchData();
          navigate("/game");
          setGameStates((prev) => ({
            ...prev,
            isAlready: false,
          }));
        }

        if (m.state == State.CHOOSE_CARD) {
          // navigate("/game");
          fetchData();
        }

        // GAME PHASE
        if (m.state == State.COUNT) {
          setCountDown(parseInt(m.remark));
        }

        if (m.state == State.PROCESS) {
          fetchData();
          setGameStates((prev) => ({
            ...prev,
            showPlaying: true,
            bottomDisp: "Dashboard",
          }));
        }

        if (m.state == State.CHOOSE_ROW) {
          fetchData();
        }

        if (m.state == State.ROW_SELECTED) {
          fetchData();
          setGameStates((prev) => ({
            ...prev,
            showPlaying: true,
          }));
        }

        // ROUND END
        if (m.state == State.ROUND_END) {
          navigate("/roundend");
        }

        if (m.state == State.GAME_END) {
          navigate("/gameend");
        }
      };
    }
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
