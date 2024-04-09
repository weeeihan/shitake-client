import React, { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "@/modules/websocket_provider";
import { useRouter } from "next/router";
import Lobby from "@/components/lobby";
import { lg } from "@/utils/utils";

const axios = require("axios");

// Structs
import { Message, Room, Player } from "@/structs/structs";

// Handlers
import * as handlers from "@/handlers/handlers";
// Constants
import { State } from "@/constants/enum";
import { actions } from "@/constants/actions";
import * as utils from "@/utils/utils";
// UI Components
import Players from "@/components/players";
import { Button } from "@/components/ui/button";
import { GET_PLAYER_API, GET_ROOM_API } from "@/constants/api";

const index = () => {
  const router = useRouter();
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
  const [init, setInit] = useState(false);
  const isLoading =
    roomData.id == "" || player.id == "" || conn == null ? true : false;
  const [isReady, setIsReady] = useState(false);
  const id: string = utils.GetID();
  const [isAlready, setIsAlready] = useState(false);
  // lg(id);

  // after getting user
  useEffect(() => {
    console.log("ID: ", id);
    handlers.ConnectToGame(id, setConn);
    handlers.GetRoomData(id, router, setRoomData);
    handlers.GetPlayer(id, setPlayer, setIsReady);
  }, []);

  useEffect(() => {
    if (conn != null && id !== "") {
      conn.onmessage = (message) => {
        const m: Message = JSON.parse(message.data);
        lg(m, true);
        if (m.state == State.NEW_PLAYER_JOINED) {
          lg("NEW PLAYER JOINED");
          handlers.GetRoomData(id, router, setRoomData);
        }
        if (m.state == State.PLAYER_LEFT) {
          handlers.GetRoomData(id, router, setRoomData);
        }
        if (m.state == State.CHOOSE_CARD) {
          router.push("/game");
        }
        if (
          m.state == State.ALREADY ||
          m.state == State.UNREADY ||
          m.state == State.READY
        ) {
          handlers.GetPlayer(id, setPlayer, setIsReady);
          handlers.GetRoomData(id, router, setRoomData);
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

  const leaveRoomHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handlers.LeaveRoom(id, router);
  };

  const readyHandler = (e: React.SyntheticEvent, name: string) => {
    e.preventDefault();
    // do something

    if (conn != null) {
      if (isReady == false) {
        conn.send(actions(State.READY));
        setIsReady(true);
      } else {
        conn.send(actions(State.UNREADY));
        setIsReady(false);
      }
    }
  };

  const startGameHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (conn != null) {
      conn.send(actions(State.START));
    }
  };

  // const startHandler = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   if (conn == null) {
  //     handlers.ConnectToGame(handlers.GetUser(), setConn);
  //   }
  //   if (conn != null) {
  //     conn.send(actions(START));
  //     // router.push("/game");
  //   }
  // };

  const debug = () => {
    lg(player);
    lg(roomData);
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          <Lobby
            player={player}
            roomData={roomData}
            readyHandler={readyHandler}
            leaveRoomHandler={leaveRoomHandler}
            isAlready={isAlready}
          />
          {/* <button onClick={debug}>debug</button> */}
        </>
      )}
    </div>
    // <div className="flex flex-col items-center justify-center h-screen bg-white">
    //   <h1 className="text-3xl font-bold mb-4">{roomData.id}</h1>
    //   <p className="text-sm text-gray-500 dark:text-gray-400 pb-10">
    //     Let people join your room by sharing the code above.
    //   </p>
    //   {isReady ? (
    //     <>
    //       <Button onClick={readyHandler}>READY!</Button>
    //     </>
    //   ) : (
    //     <Button onClick={readyHandler}>READY?</Button>
    //   )}

    //   <p className="text-sm text-gray-500 dark:text-gray-400 pb-10">
    //     {conn != null ? "Connected" : "Not Connected"}
    //   </p>
    //   <Players data={roomData?.players} />
    //   <Button onClick={startGameHandler}>Start</Button>
    //   <Button className="w-full max-w-sm mt-8" onClick={leaveRoomHandler}>
    //     Leave Room
    //   </Button>

    //   <Button onClick={debug}>Debug</Button>
    // </div>
  );
};

export default index;
