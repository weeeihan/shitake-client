import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as handlers from "@/handlers/handlers";
import { WebsocketContext } from "@/modules/websocket_provider";
import { Game, PlayerData } from "@/structs/structs";
import { Button } from "@/components/ui/button";
import Deck from "@/components/deck";
import Hand from "@/components/hand";
import {
  CALCULATING,
  CHOOSE_CARD,
  CHOOSE_ROW,
  PLAY,
  ROUND_END,
  ROW,
} from "@/constants/enum";
import { actions } from "@/constants/actions";

const index = () => {
  const router = useRouter();
  const [isChooser, setIsChooser] = useState<boolean>(false);
  // const [row, setRow] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gameState, setGameState] = useState<string>("");
  const [showHands, setShowHands] = useState<boolean>(true);

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

  const [chosenCard, setChosenCard] = useState<number>(0);

  const { setConn, conn } = useContext(WebsocketContext);

  useEffect(() => {
    const user = handlers.GetUser();
    if (user == null) {
      router.push("/");
      return;
    }
    if (conn == null) {
      handlers.ConnectToGame(user, setConn);
    }
    handlers.GetGameData(user.roomID, setGamedata, router);
    handlers.GetPlayer(user.name + user.roomID, setPlayerData);
  }, []);

  useEffect(() => {
    if (gamedata.id != "") {
      setIsLoading(false);
    }
  }, [gamedata]);

  useEffect(() => {
    if (conn != null) {
      conn.onmessage = (message) => {
        const user = handlers.GetUser();
        const m = JSON.parse(message.data);
        console.log(m);
        if (m.state == CHOOSE_ROW) {
          console.log(m.remark);
          setShowHands(false);
          if (m.remark == user.name + user.roomID) {
            setIsChooser(true);
          }
          setGameState("Choose row");
        }
        if (m.state == CHOOSE_CARD) {
          setShowHands(true);
          setGameState("Choose card");
          setChosenCard(0);
          handlers.GetGameData(handlers.GetUser().roomID, setGamedata, router);
          handlers.GetPlayer(
            handlers.GetUser().name + handlers.GetUser().roomID,
            setPlayerData
          );
        }
        if (m.state == ROUND_END) {
          router.push("/roundend");
        }
      };
    }
  }, [conn]);

  const playCard = (card: number) => {
    console.log("Played card " + card);
    setChosenCard(card);
    if (conn != null && card != 0) {
      conn.send(actions(PLAY, card));
    }
  };

  const chooseRow = (row: number) => {
    setIsChooser(false);
    console.log("Chose row " + row);
    if (conn != null && row != -1) {
      conn.send(actions(ROW, chosenCard, row));
    }
  };

  const debug = () => {
    console.log(gamedata);
    console.log(playerData);
    console.log(localStorage.getItem("User"));
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <h2>{gameState}</h2>
            <Deck
              data={gamedata.deck}
              isChooser={isChooser}
              chooseRow={chooseRow}
            />
            {showHands && (
              <>
                <Hand data={playerData.hand} playCard={playCard} />
                <div>Locked in: {chosenCard}</div>
              </>
            )}
            <div>Score: {playerData.score}</div>
            <Button onClick={debug}>debug</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default index;
