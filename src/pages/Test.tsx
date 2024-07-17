import { useContext, useState } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
// import { WebsocketContext } from "../modules/websocket_provider";
import { actions, health } from "../utils/utils";
import Dashboard from "../components/Dashboard";
import { Player, PlayerDisplay, Room } from "../utils/struct";
import { TypeAnimation } from "react-type-animation";
import * as utils from "../utils/utils";
import Deck from "../components/Deck";
import Hand from "../components/Hand";

const Test = () => {
  const {
    gameData: { room, player },
  } = useContext(GamestateContext);

  // const { conn } = useContext(WebsocketContext);
  const [ready, setReady] = useState(false);

  const handleReady = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setReady(true);
    // if (conn !== null) {
    // conn.send(actions(State.READY));
    // }
  };
  const debug = () => {
    console.log(room);
  };

  let bottomDisp = "Dashboard";
  const [isAlready, setIsAlready] = useState(true);
  const handleStartGame = () => {
    console.log("Start game");
  };

  const [survivors, fallen] = utils.getResults(room.players);

  const players = utils.SortPlayers(room.players);

  return (
    <div className="py-[7rem] flex flex-col text-center items-center">
      <div className="text-5xl font-rubik my-2">WINNERS</div>
      <div>
        {survivors.map((p, i) => (
          <div className="my-2" key={i}>
            {p.name}
          </div>
        ))}
        {survivors.length == 0 && <div>No survivors... </div>}
      </div>

      <hr />
      <div>In loving memory of</div>
      <div>
        {fallen.map((p, i) => (
          <div className="my-2" key={i}>
            {p.name}
          </div>
        ))}
      </div>

      <div>
        <button>Back to lobby </button>
      </div>
      {/* <div>Show stats?</div> */}
      {/* <button onClick={debug}>Debug game end</button> */}
    </div>
  );
};

export default Test;
