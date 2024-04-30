// Types
import { Message, Player, Room } from "../utils/struct";

// Functions
import React, { useContext, useEffect, useState } from "react";
import * as utils from "../utils/utils";
import * as handlers from "../utils/handlers";
import { useNavigate } from "react-router-dom";

// Contexts
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";

// UI
import LobbyCanvas from "../components/LobbyCanvas";

const Lobby = () => {
  const navigate = useNavigate();
  const {
    setRoomData,
    roomData,
    player,
    State,
    setPlayerStatus,
    playerStatus,
  } = useContext(GamestateContext);
  const { setConn, conn } = useContext(WebsocketContext);
  // const [player, setPlayer] = useState<Player>({
  //   id: "",
  //   name: "",
  //   score: 0,
  //   hand: [],
  //   ready: false,
  // });
  // const [roomData, setRoomData] = useState<Room>({
  //   id: "",
  //   state: "",
  //   players: [],
  //   deck: [],
  // });
  const isLoading =
    roomData.id == "" || player.id == "" || conn == null || State == null
      ? true
      : false;

  useEffect(() => {
    console.log(playerStatus);
    if (playerStatus == "Fail") {
      navigate("/");
    }
    if (playerStatus == "Success") {
      handlers.GetRoom(player.id, setPlayerStatus, setRoomData);
      handlers.ConnectToGame(player.id, setConn);
    }
  }, [playerStatus]);

  // useEffect(() => {
  //   if (isPlayer && State !== null) {
  //     // connect to game
  //     handlers.ConnectToGame(id, setConn);

  //   }
  // }, [isPlayer, State]);

  // useEffect(() => {
  //   if (conn !== null) {
  //     conn.onmessage = (message) => {
  //       const m: Message = JSON.parse(message.data);
  //       console.log(m);
  //       if (m.state == State.REGISTERED) {
  //         setIsAlready(false);
  //         // refresh when someone refreshes
  //         handlers.GetRoom(id, navigate, "/lobby", setRoomData, State);
  //       }
  //       if (m.state == State.NEW_PLAYER_JOINED) {
  //         handlers.GetRoom(id, navigate, "/lobby", setRoomData, State);
  //       }
  //       if (m.state == State.PLAYER_LEFT) {
  //         handlers.GetRoom(id, navigate, "/lobby", setRoomData, State);
  //       }
  //       if (m.state == State.CHOOSE_CARD) {
  //         navigate("/game");
  //       }
  //       if (
  //         m.state == State.ALREADY ||
  //         m.state == State.UNREADY ||
  //         m.state == State.READY
  //       ) {
  //         handlers.GetPlayer(id, setPlayer);
  //         handlers.GetRoom(id, navigate, "/lobby", setRoomData, State);
  //         if (m.state == State.ALREADY) {
  //           setIsAlready(true);
  //         }
  //         if (m.state == State.UNREADY) {
  //           setIsAlready(false);
  //         }
  //       }
  //     };
  //   }
  // }, [conn]);

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
      setPlayerStatus("Fail");
      navigate("/");
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
    console.log(roomData);
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
