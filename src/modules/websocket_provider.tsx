import React, { useState, createContext, useEffect, useContext } from "react";
import { GamestateContext } from "./gamestate_provider";
import { Message, Player } from "../utils/struct";
import * as handlers from "../utils/handlers";
import { redirect, useLocation, useNavigate } from "react-router-dom";
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
    if (id === "none" || id == "") {
      navigate("/");
      return;
    }
    handlers.GetPlayer(id, setPlayer);
    handlers.GetRoom(id, setRoomData);
  }

  useEffect(() => {
    if (player.id !== "" && conn == null) {
      handlers.ConnectToGame(player.id, setConn);
    }
  }, [player]);

  useEffect(() => {
    if (conn !== null && State !== null) {
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
  }, [conn, State]);

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
