import React, { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "@/modules/websocket_provider";
import { useRouter } from "next/router";

// Structs
import { Message, Room, Player } from "@/structs/structs";

// Handlers
import * as handlers from "@/handlers/handlers";
// Constants
import {
  PLAYER_LEFT,
  NEW_PLAYER_JOINED,
  READY,
  UNREADY,
  CHOOSE_CARD,
} from "@/constants/enum";
import { actions } from "@/constants/actions";
import * as utils from "@/utils/utils";
// UI Components
import Players from "@/components/players";
import { Button } from "@/components/ui/button";

const index = () => {
  const router = useRouter();
  const { setConn, conn } = useContext(WebsocketContext);

  const [roomData, setRoomData] = useState<Room>({
    id: "",
    state: "",
    players: [],
  });
  const [isReady, setIsReady] = useState(false);
  const [player, setPlayer] = useState<Player>({
    id: "",
    name: "",
    roomID: "",
  });

  // authenticate user
  useEffect(() => {
    setPlayer(utils.GetPlayer());
  }, []);

  // after getting user
  useEffect(() => {
    if (player.id != "") {
      console.log(player);
      if (roomData.id == "") {
        handlers.GetRoomData(player.roomID, router, setRoomData);
      }
      if (conn == null) {
        handlers.ConnectToGame(player, setConn);
      }
    }
  }, [player]);

  useEffect(() => {
    if (conn != null && player.id != "") {
      conn.onmessage = (message) => {
        const m: Message = JSON.parse(message.data);
        if (m.state == NEW_PLAYER_JOINED) {
          handlers.GetRoomData(player.roomID, router, setRoomData);
        }
        if (m.state == PLAYER_LEFT) {
          handlers.GetRoomData(player.roomID, router, setRoomData);
        }
        if (m.state == CHOOSE_CARD) {
          router.push("/game");
        }
      };
    }
  }, [conn]);

  const leaveRoomHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handlers.LeaveRoom(player, router);
  };

  const readyHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (conn == null) {
      handlers.ConnectToGame(player, setConn);
    }
    if (conn != null) {
      if (!isReady) {
        conn.send(actions(READY));
      } else {
        conn.send(actions(UNREADY));
      }
    }

    setIsReady(!isReady);
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
    console.log(localStorage.getItem("User"));
    // localStorage.clear()
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4">{roomData.id}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 pb-10">
        Let people join your room by sharing the code above.
      </p>
      {isReady ? (
        <>
          <Button onClick={readyHandler}>READY!</Button>
        </>
      ) : (
        <Button onClick={readyHandler}>READY?</Button>
      )}

      <p className="text-sm text-gray-500 dark:text-gray-400 pb-10">
        {conn != null ? "Connected" : "Not Connected"}
      </p>
      <Players data={roomData?.players} />
      <Button className="w-full max-w-sm mt-8" onClick={leaveRoomHandler}>
        Leave Room
      </Button>

      <Button onClick={debug}>Debug</Button>
    </div>
  );
};

export default index;
