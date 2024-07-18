import { useContext } from "react";

import { GamestateContext } from "../modules/gamestate_provider";

const Dashboard = () => {
  const {
    gameData: { room },
    setGameStates,
    gameImages,
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
      <div className="w-11/12 max-h-[25vh] border border-black flex flex-col rounded-2xl shadow-xl ">
        <div className="my-4 mx-4 overflow-y-auto">
          {room.players.map((player, index) => (
            <div key={index} className="my-2">
              <div>
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
      <img
        src={gameImages["door-close"]}
        alt="Door"
        width={45}
        className="footer"
        onClick={() =>
          setGameStates((prevState: any) => ({
            ...prevState,
            onLeave: true,
          }))
        }
      />
    </>
  );
};

export default Dashboard;
