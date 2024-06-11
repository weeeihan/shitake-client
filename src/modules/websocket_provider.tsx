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
    gameData: { room },
    setGameStates,
    gameConstants: { State },
    refetchData,
  } = useContext(GamestateContext);

  // console.log(State);
  const id = utils.GetID();

  // connect to websocket
  useEffect(() => {
    // To ensure that there is only 1 connection
    if (
      location.pathname !== "/" &&
      conn === null &&
      (!connRef.current || connRef.current.readyState === WebSocket.CLOSED) &&
      location.pathname !== "/test"
    ) {
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
          refetchData();
        }

        // Someone ready
        if (
          m.state == State.ALREADY ||
          m.state == State.UNREADY ||
          m.state == State.READY
        ) {
          refetchData();
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
          refetchData();
          console.log("YO");
          setGameStates((prev) => ({
            ...prev,
            isAlready: false,
            showPlaying: false,
          }));
          navigate("/game");
        }

        if (m.state == State.CHOOSE_CARD) {
          // navigate("/game");
          refetchData();
          // setGameStates((prevState: GameStates) => ({
          //   ...prevState,
          //   handToggle: true,
          //   bottomDisp: "Dashboard",
          // }));
        }

        // GAME PHASE
        if (m.state == State.COUNT) {
          setCountDown(parseInt(m.remark));
        }

        if (m.state == State.CALCULATING) {
          // setGameStates((prevState: GameStates) => ({
          //   ...prevState,
          //   currentDeck: roomData.deck,
          // }));
        }

        if (
          m.state == State.PROCESS ||
          m.state == State.ROUND_END ||
          m.state == State.GAME_END
        ) {
          refetchData();
          console.log("SHOWING PLAY:");
          setGameStates((prev) => ({
            ...prev,
            showPlaying: true,
            selected: -1,
          }));
        }

        if (m.state == State.CHOOSE_ROW) {
          refetchData();
          setGameStates((prev) => ({
            ...prev,
            handToggle: false,
            bottomDisp: "Blank",
          }));
          // Hide hands
        }

        if (m.state == State.ROW_SELECTED) {
          refetchData();
          setGameStates((prev) => ({
            ...prev,
            showPlaying: true,
          }));
        }

        if (m.state == State.LOBBY) {
          navigate("/lobby");
        }

        // ROUND END
        // if (m.state == State.ROUND_END) {
        //   navigate("/roundend");
        // }

        // if (m.state == State.GAME_END) {
        //   navigate("/gameend");
        // }
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
