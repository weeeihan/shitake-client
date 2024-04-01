import { Game, PlayerData, UserInfo } from "@/structs/structs";
import React, { use, useContext, useEffect, useState } from "react";
import * as handlers from "@/handlers/handlers";
import { WebsocketContext } from "@/modules/websocket_provider";
import { useRouter } from "next/router";
import Scoreboard from "@/components/scoreboard";
import { CHOOSE_CARD, READY } from "@/constants/enum";
import { actions } from "@/constants/actions";

const index = () => {
  const [user, setUser] = useState<UserInfo>({ name: "", roomID: "" });
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

  // getUser first
  useEffect(() => {
    setUser(handlers.GetUser());
  }, []);

  // Connect to game, gamedata and PlayerData
  useEffect(() => {
    if (user.name !== "") {
      if (!conn) {
        handlers.ConnectToGame(user, setConn);
      }
      handlers.GetGameData(user.roomID, setGamedata, router);
      handlers.GetPlayer(user.name + user.roomID, setPlayerData);
    }
  }, [user]);

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
      };
    }
  }, [conn]);

  const getReady = () => {
    if (conn !== null) {
      conn.send(actions(READY));
    }
  };

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <Scoreboard gamedata={gamedata} getReady={getReady} isGame={false} />
        </>
      )}
    </>
  );
};

export default index;
