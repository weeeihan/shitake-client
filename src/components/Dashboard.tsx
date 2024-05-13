import React, { useContext } from "react";
import * as images from "../assets/images/images";
import ProgressBar from "@ramonak/react-progress-bar";
import { PlayerDisplay } from "../utils/struct";
import { GamestateContext } from "../modules/gamestate_provider";

const Dashboard = () => {
  const { roomData } = useContext(GamestateContext);

  return (
    <>
      {roomData.players.map((player, index) => (
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

export default Dashboard;
