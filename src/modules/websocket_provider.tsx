import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useRef,
} from "react";
import { GamestateContext } from "./gamestate_provider";
import * as handlers from "../utils/handlers";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [countDown, setCountDown] = useState<number>(0);
  const [conn, setConn] = useState<Conn>(null);
  const {
    gameData: { player },
    gameConstants: { State },
    fetchData,
  } = useContext(GamestateContext);

  const id = utils.GetID();
  const initialized = useRef(false);

  // For websocket connection
  useEffect(() => {
    if (!initialized.current && id !== "none") {
      handlers.ConnectToGame(id, setConn);
      initialized.current = true;
    }
  }, [location]);

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
