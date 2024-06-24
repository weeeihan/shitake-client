import React, { useContext } from "react";

import { GamestateContext } from "../modules/gamestate_provider";

const Dashboard = () => {
  const {
    gameData: { room },
  } = useContext(GamestateContext);

  function health(hp: number) {
    if (hp > 70) {
      return "healthy";
    }
    if (hp > 40) {
      return "decent";
    }
    return "warning";
  }

  return (
    <>
      <div className="border-[0.1rem] w-3/4 flex flex-col border-black rounded-2xl shadow-xl">
        <div className="my-4 mx-4">
          {room.players.map((player, index) => (
            <div key={index} className="my-2">
              <div>
                {player.name} {player.hp}/100 {player.ready ? "🍄" : ""}
              </div>

              <progress
                max={100}
                value={player.hp}
                className={health(player.hp)}
                // className="w-1/2 border-2 border-black color-black"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
