import React from "react";
import * as images from "../assets/images/images";
import ProgressBar from "@ramonak/react-progress-bar";
import { PlayerDisplay } from "../utils/struct";

type Props = {};

const Dashboard = () => {
  const players: PlayerDisplay[] = [
    {
      name: "Han",
      score: 60,
      ready: false,
    },
    {
      name: "Kelly",
      score: 40,
      ready: true,
    },
    {
      name: "Jordan",
      score: 90,
      ready: false,
    },
  ];

  return (
    <>
      {players.map((player, index) => (
        <div key={index}>
          <div>
            {player.name} {player.score}/100{" "}
            {player.ready ? "Ready" : "Not Ready"}
          </div>
          <progress max={100} value={player.score} />
        </div>
      ))}
    </>
  );
};

export default Dashboard;
