import React, { useContext } from "react";

import { GamestateContext } from "../modules/gamestate_provider";

const Dashboard = () => {
  const {
    gameData: { roomData },
  } = useContext(GamestateContext);

  return (
    <>
      {roomData.players.map((player, index) => (
        <div key={index}>
          <div>
            {player.name} {player.hp}/100 {player.ready ? "Ready" : "Not Ready"}
          </div>
          <progress max={100} value={player.hp} />
        </div>
      ))}
    </>
  );
};

export default Dashboard;
