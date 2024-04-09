import { Game, PlayerData, Player } from "@/structs/structs";
import React, { use, useContext, useEffect, useState } from "react";
import * as handlers from "@/handlers/handlers";
import * as utils from "@/utils/utils";
import { WebsocketContext } from "@/modules/websocket_provider";
import { useRouter } from "next/router";
import Scoreboard from "@/components/scoreboard";
import { CHOOSE_CARD, READY, LOBBY } from "@/constants/enum";
import { actions } from "@/constants/actions";

const index = () => {
  const [player, setPlayer] = useState<Player>({
    id: "",
    name: "",
    roomID: "",
  });
  const [gamedata, setGamedata] = useState<Game>({
    id: "",
    deck: [],
    state: 0,
    players: [],
  });

  const [playerData, setPlayerData] = useState<PlayerData>({
    id: "",
    name: "",
    score: 0,
    hand: [],
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { conn, setConn } = useContext(WebsocketContext);

  // getPlayer first
  useEffect(() => {
    setPlayer(utils.GetPlayer());
  }, []);

  // Connect to game, gamedata and PlayerData
  useEffect(() => {
    if (player.name !== "") {
      handlers.ConnectToGame(player, setConn);
      handlers.GetGameData(player.roomID, setGamedata, router);
      handlers.GetPlayer(player, setPlayerData);
    }
  }, [player]);

  // Display page
  useEffect(() => {
    if (gamedata.id !== "") {
      setIsLoading(false);
    }
  }, [gamedata]);

  // For streaming data
  useEffect(() => {
    if (conn) {
      conn.onmessage = (message) => {
        const m = JSON.parse(message.data);
        console.log(m);
        if (m.state == CHOOSE_CARD) {
          router.push("/game");
        }
        if (m.state == LOBBY) {
          router.push("/lobby");
        }
      };
    }
  }, [conn]);

  const getReady = () => {
    if (conn !== null) {
      conn.send(actions(READY));
    }
  };

  const lobby = () => {
    if (conn !== null) {
      conn.send(actions(LOBBY));
    }
  };

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <Scoreboard
            gamedata={gamedata}
            getReady={getReady}
            isGame={true}
            lobby={lobby}
          />
        </>
      )}
    </>
  );
};

export default index;
