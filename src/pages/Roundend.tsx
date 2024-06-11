import { useContext } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
import { DamageReport, Player } from "../utils/struct";
import Mushcard from "../components/Mushcard";
import { WebsocketContext } from "../modules/websocket_provider";
import { actions } from "../utils/utils";

const Roundend = () => {
  const {
    gameConstants: { Mushrooms, State },
  } = useContext(GamestateContext);

  const { conn } = useContext(WebsocketContext);
  const {
    gameData: { roomData, player },
  } = useContext(GamestateContext);

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
    if (conn !== null) {
      conn.send(actions(State.READY));
    }
  };
  const debug = () => {
    console.log(player);
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
            player.damageReport.damageTaken +
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
      <div className="horz-scroll">
        {player.damageReport.mushrooms.map((mushroom, index) => (
          <div className="horz-item" key={index}>
            {<Mushcard mush={mushroom} />}
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleReady}>Ready for next round</button>
      </div>
      <div>Dashboard</div>
      <button onClick={debug}>Debug-test</button>
    </div>
  );
};

export default Roundend;
