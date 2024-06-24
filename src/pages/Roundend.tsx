import { useContext, useState } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
import Mushcard from "../components/Mushcard";
import { WebsocketContext } from "../modules/websocket_provider";
import { actions } from "../utils/utils";
import Dashboard from "../components/Dashboard";

const Roundend = () => {
  const {
    gameConstants: { State },
  } = useContext(GamestateContext);

  const { conn } = useContext(WebsocketContext);
  const {
    gameData: { room, player },
  } = useContext(GamestateContext);

  const [ready, setReady] = useState(false);

  // const player: Player = {
  //   id: "12345",
  //   name: "Hansaplou",
  //   hp: 73,
  //   hand: [],
  //   ready: false,
  //   play: -1,
  //   damageReport: {
  //     mushrooms: [13, 17, 19, 20, 27, 8, 12, 56, 1],
  //     damage: 27,
  //     roundMushrooms: [13, 17, 19],
  //     roundDamage: 5,
  //   } as DamageReport,
  // };

  const handleReady = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setReady(true);
    if (conn !== null) {
      conn.send(actions(State.READY));
    }
  };
  const debug = () => {
    console.log(room);
  };

  return (
    <div className="w-screen h-screen py-[7rem]">
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
            player.damageReport.damageTaken +
            "% in total"}
        </div>
      </div>
      <hr />
      <div>Mushroom consumed:</div>
      <div>
        {player.damageReport.roundMushrooms +
          " in this round / " +
          player.damageReport.mushrooms +
          " in total"}
      </div>

      <div className=" flex justify-center">
        <button onClick={handleReady}>
          {ready ? "Waiting for others..." : "Ready for next round!"}
        </button>
      </div>
      <div className="mt-20">
        <Dashboard />
      </div>
      <button onClick={debug}>Debug-test</button>
    </div>
  );
};

export default Roundend;
