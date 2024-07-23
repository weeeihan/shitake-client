import { useContext } from "react";

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
      <div className="w-11/12 max-h-[25vh] bg-white border border-black flex flex-col rounded-2xl shadow-xl ">
        <div className="my-4 mx-4 overflow-y-auto">
          {room.players.map((player, index) => (
            <div key={index} className="mt-1 font-patrick tracking-wide">
              <div className="-mb-1">
                {player.name +
                  "   (" +
                  player.hp +
                  "/100) " +
                  (player.ready ? "🍄" : "") +
                  (player.hp < 0 ? "💀" : "")}
              </div>

              <progress
                max={100}
                value={player.hp >= 0 ? player.hp : 0}
                className={health(player.hp)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
