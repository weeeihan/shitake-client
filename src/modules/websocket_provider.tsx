import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useRef,
} from "react";
import { GamestateContext } from "./gamestate_provider";
import * as handlers from "../utils/handlers";
import * as utils from "../utils/utils";
type Conn = WebSocket | null;

export const WebsocketContext = createContext<{
  conn: WebSocket | null;
  countDown: number;
}>({
  conn: null,
  countDown: 0,
});

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [countDown, setCountDown] = useState<number>(0);
  const [conn, setConn] = useState<Conn>(null);
  const {
    gameData: { player },
    gameConstants: { State },
    gameStates: { onLeave },
    fetchData,
    navigate,
    setGameState,
    gameImages,
    path,
  } = useContext(GamestateContext);

  const id = utils.GetID();
  const initialized = useRef(false);

  // For websocket connection
  useEffect(() => {
    if (!initialized.current && id !== "none" && conn === null) {
      // console.log("attempt to connect");
      handlers.ConnectToGame(id, setConn);
      initialized.current = true;
    }
  }, [path]);

  // Listen websocket messages
  useEffect(() => {
    if (conn !== null) {
      conn.onmessage = (message) => {
        const m = JSON.parse(message.data);

        // // Refetch data if needed.
        if (utils.needRefetch(m, State, player)) {
          console.log("message trigger");
          fetchData(State, m);
        }

        if (m.state == State.COUNT) {
          setCountDown(parseInt(m.remark));
        }
      };

      conn.onclose = () => {
        // On connection closing
        initialized.current = false;
      };
    }
  }, [conn]);

  if (id !== "none" && conn === null) {
    return <div>Connecting... </div>;
  }

  const handleLeaveRoom = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (conn !== null) {
      localStorage.clear();
      navigate("/");
      conn.send(utils.actions(State.LEAVE));
      setGameState({ onLeave: false });
    }
  };

  if (onLeave)
    return (
      <div className="text-center flex flex-col items-center justify-center h-screen">
        <div className="font-patrick text-2xl my-10 tracking-wide">
          Leaving already? 😢
        </div>
        <div className="mb-10">
          <span
            className="cursor-pointer text-3xl font-patrick tracking-wide"
            onClick={handleLeaveRoom}
          >
            YES
          </span>
          <span className="text-3xl font-patrick tracking-wide mx-10">|</span>
          <span
            className="cursor-pointer text-3xl font-patrick tracking-wide"
            onClick={() => setGameState({ onLeave: false })}
          >
            NO{" "}
          </span>
        </div>

        <img
          src={gameImages["door-open"]}
          alt="Door"
          width={45}
          className="  drop-shadow-lg  "
        />
      </div>
    );

  return (
    <WebsocketContext.Provider
      value={{
        conn: conn,
        // setConn: setConn,
        countDown: countDown,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebSocketProvider;
