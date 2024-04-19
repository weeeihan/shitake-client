import React, { useContext, useEffect, useState } from "react";
import * as utils from "../utils/utils";
import * as handlers from "../utils/handlers";
import { State } from "../utils/state";

import { Message, Player, Room } from "../utils/struct";
import { useNavigate } from "react-router-dom";
import { WebsocketContext } from "../modules/websocket_provider";
import LobbyCanvas from "../components/LobbyCanvas";

const Lobby = () => {
  const navigate = useNavigate();
  const { setConn, conn } = useContext(WebsocketContext);
  const [player, setPlayer] = useState<Player>({
    id: "",
    name: "",
    score: 0,
    hand: [],
  });
  const [roomData, setRoomData] = useState<Room>({
    id: "",
    state: "",
    players: [],
  });
  const isLoading =
    roomData.id == "" || player.id == "" || conn == null ? true : false;
  const [isReady, setIsReady] = useState(false);
  const id: string = utils.GetID();
  const [isAlready, setIsAlready] = useState(false);

  useEffect(() => {
    handlers.ConnectToGame(id, setConn);
    handlers.GetRoom(id, navigate, "/lobby", setRoomData);
    handlers.GetPlayer(id, setPlayer, setIsReady);
  }, []);

  useEffect(() => {
    if (conn != null && id !== "") {
      conn.onmessage = (message) => {
        const m: Message = JSON.parse(message.data);
        if (m.state == State.NEW_PLAYER_JOINED) {
          handlers.GetRoom(id, navigate, "/lobby", setRoomData);
        }
        if (m.state == State.PLAYER_LEFT) {
          handlers.GetRoom(id, navigate, "/lobby", setRoomData);
        }
        if (m.state == State.CHOOSE_CARD) {
          navigate("/game");
        }
        if (
          m.state == State.ALREADY ||
          m.state == State.UNREADY ||
          m.state == State.READY
        ) {
          handlers.GetPlayer(id, setPlayer, setIsReady);
          handlers.GetRoom(id, navigate, "/lobby", setRoomData);
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

  const handleLeaveRoom = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handlers.LeaveRoom(id, navigate);
  };

  const handleReady = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(isReady);
    if (conn != null) {
      if (!isReady) {
        conn.send(utils.actions(State.READY));
        setIsReady(true);
      } else {
        conn.send(utils.actions(State.UNREADY));
        setIsReady(false);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LobbyCanvas
        player={player}
        roomData={roomData}
        handleReady={handleReady}
        handleLeaveRoom={handleLeaveRoom}
        isAlready={isAlready}
      />
    </>
  );
};

export default Lobby;
