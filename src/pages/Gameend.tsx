import React, { useContext, useState } from "react";
import Deck from "../components/Deck";
import Dashboard from "../components/Dashboard";
import Scoreboard from "../components/Scoreboard";
import Winner from "../components/Winner";
import { GamestateContext } from "../modules/gamestate_provider";
import * as utils from "../utils/utils";
import { WebsocketContext } from "../modules/websocket_provider";

const Gameend = () => {
  const { roomData, State } = useContext(GamestateContext);
  const { conn } = useContext(WebsocketContext);
  const [playAgain, setPlayAgain] = useState(false);

  if (roomData.id == "" || State == null || conn == null)
    return <div>Loading</div>;

  const players = utils.SortPlayers(roomData.players);
  const winner = utils.GetWinner(players);
  const handlePlayAgain = () => {
    setPlayAgain(true);
    if (conn !== null) {
      conn.send(utils.actions(State.READY));
    }
  };
  const debug = () => {
    console.log(roomData);
  };
  return (
    <div>
      <Deck />
      <Winner winner={winner} />
      <Scoreboard players={players} />
      <div>
        {playAgain ? (
          " Waiting for other players"
        ) : (
          <button onClick={handlePlayAgain}> Play again </button>
        )}
      </div>
      <div>
        <button>Back to lobby</button>
      </div>
      <div>
        <button onClick={debug}>debug</button>
      </div>
    </div>
  );
};

export default Gameend;
