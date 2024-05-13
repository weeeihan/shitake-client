import React from "react";
import { PlayerDisplay } from "../utils/struct";

interface props {
  players: PlayerDisplay[];
}
const Scoreboard = ({ players }: props) => {
  return (
    <>
      {players.map((player, index) => (
        <div key={index}>
          <div>
            {player.name} {100 - player.score}/100{" "}
            {player.ready ? "Ready" : "Not Ready"}
          </div>
          <progress max={100} value={100 - player.score} />
        </div>
      ))}
    </>
  );
};

export default Scoreboard;
