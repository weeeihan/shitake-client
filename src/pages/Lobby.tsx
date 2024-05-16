// Functions
import React, { useContext } from "react";
import * as utils from "../utils/utils";
import { useNavigate } from "react-router-dom";

// Contexts
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";

// UI
import LobbyCanvas from "../components/LobbyCanvas";
import { Room } from "../utils/struct";

const Lobby = () => {
  const navigate = useNavigate();
  const { setRoomData, roomData, player, State, bottomDisp } =
    useContext(GamestateContext);
  const { setConn, conn } = useContext(WebsocketContext);

  const isLoading =
    roomData.id == "" || player.id == "" || conn == null || State == null
      ? true
      : false;

  const handleStartGame = () => {
    if (conn !== null) {
      conn.send(utils.actions(State.START));
    }
  };

  const handleLeaveRoom = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (conn !== null) {
      conn.send(utils.actions(State.LEAVE));
      localStorage.clear();
      navigate("/");
      roomData;
    }
  };

  const handleReady = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (conn != null) {
      if (player.ready == false) {
        conn.send(utils.actions(State.READY));
      } else {
        conn.send(utils.actions(State.UNREADY));
      }
    }
  };

  const debug = () => {
    // localStorage.clear();
    console.log(conn);
    // if (conn !== null) {
    //   conn.send(utils.actions(State.PING));
    // }
  };

  if (isLoading) {
    return (
      <div>
        Loading...<button onClick={debug}>debug</button>
      </div>
    );
  }

  return (
    <>
      <LobbyCanvas
        handleReady={handleReady}
        handleLeaveRoom={handleLeaveRoom}
        handleStartGame={handleStartGame}
      />
      <button onClick={debug}>Debug</button>
    </>
  );
};

export default Lobby;
