import { useContext, useState } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
import { WebsocketContext } from "../modules/websocket_provider";
import { actions, health } from "../utils/utils";
import Dashboard from "../components/Dashboard";
import { TypeAnimation } from "react-type-animation";

const Roundend = () => {
  const {
    gameConstants: { State },
  } = useContext(GamestateContext);

  const { conn } = useContext(WebsocketContext);
  const {
    gameData: { player },
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
  // const debug = () => {
  //   console.log(room);
  // };

  return (
    <div className="flex flex-col py-[8rem] items-center">
      <div className="border border-black w-11/12 rounded-2xl shadow-xl">
        <div className="m-5 space-y-2">
          <div className="text-2xl text-center">Damage Report Card</div>
          <hr />
          <div>
            <div>{"Name: " + player.name}</div>
          </div>
          <hr />
          <div>
            <div>{"HP: " + player.hp + " / 100"}</div>
            <progress
              max={100}
              value={player.hp}
              className={health(player.hp)}
            />
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
        </div>
      </div>
      {ready ? (
        <div className="mt-10 py-2 px-2">
          <TypeAnimation
            sequence={[
              "Waiting for other players...",
              3000,
              "Ask them to get ready!",
              3000,
              () => {},
            ]}
            repeat={Infinity}
          />
        </div>
      ) : (
        <button
          onClick={handleReady}
          className="font-klee bg-black text-white mt-10 rounded-lg py-2 px-2 drop-shadow-md"
        >
          Ready for next round!
        </button>
      )}

      <div className="mt-[2rem]  items-center justify-center flex w-screen">
        <Dashboard />
      </div>
      {/* <button onClick={debug}>Debug-test</button> */}
    </div>
  );
};

export default Roundend;
