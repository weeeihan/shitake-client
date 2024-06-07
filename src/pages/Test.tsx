import { useContext, useEffect, useRef, useState } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
import * as images from "../assets/images/images";
import { play, useInterval, getY, getX } from "../utils/utils";
import { animate, motion } from "framer-motion";
import { DamageReport, Player } from "../utils/struct";
import Dashboard from "../components/Dashboard";

const Test = () => {
  // const {
  //   gameData: { roomData, player },
  // } = useContext(GamestateContext);

  const player: Player = {
    id: "12345",
    name: "Hansaplou",
    hp: 73,
    hand: [],
    ready: false,
    play: -1,
    damageReport: {
      mushrooms: [13, 17, 19, 20, 27, 8, 12, 56, 1],
      damage: 27,
      roundMushrooms: [13, 17, 19],
      roundDamage: 5,
    } as DamageReport,
  };

  return (
    <div className="w-screen h-screen">
      <div>Damage Report Card</div>
      <hr />
      <div>
        <div>
          {player.name} {player.hp}/100 {player.ready ? "Ready" : "Not Ready"}
        </div>
        <progress max={100} value={player.hp} />
      </div>
      <hr />
      <div>
        <div>Damage taken:</div>
        <div>
          {player.damageReport.roundDamage +
            "% in this round / " +
            player.damageReport.damage +
            "% in total"}
        </div>
      </div>
      <hr />
      <div>Mushroom consumed:</div>
      <div>
        {player.damageReport.roundMushrooms.length +
          " in this round / " +
          player.damageReport.mushrooms.length +
          " in total"}
      </div>
      <div className="container">
        <div className="item">
          <div>1</div>
        </div>
        <div className="item">
          <div>2</div>
        </div>
        <div className="item">
          <div>3</div>
        </div>
        <div className="item">
          <div>4</div>
        </div>
        <div className="item">
          <div>5</div>
        </div>
        <div className="item">
          <div>6</div>
        </div>
      </div>
      <div>Ready for next round</div>
      <div>Dashboard</div>
    </div>
  );
};

export default Test;
