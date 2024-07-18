import { useContext, useState } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
import { WebsocketContext } from "../modules/websocket_provider";
import { actions, getResults } from "../utils/utils";

const Gameend = () => {
  const {
    gameConstants: { State },
    gameData: { room },
    gameImages,
  } = useContext(GamestateContext);

  const [survivors, fallen] = getResults(room.players);
  const { conn } = useContext(WebsocketContext);
  const [confirm, setConfirm] = useState(false);
  // const {
  //   gameData: { roomData, player },
  // } = useContext(GamestateContext);

  const handleReady = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (conn !== null) {
      conn.send(actions(State.READY));
    }
  };

  const handleBack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (conn !== null) {
      conn.send(actions(State.LEAVE));
    }
  };

  // const debug = () => {
  //   console.log(room);
  // };

  if (confirm) {
    return (
      <div className="py-[7rem]">
        <div>Go back to lobby?</div>
        <div>
          <button onClick={handleBack}>Yes</button>
        </div>
        <div>
          <button onClick={() => setConfirm(false)}>No</button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-[7rem] flex flex-col text-center items-center">
      <div className="text-5xl font-rubik my-2">Survivors</div>
      <div>
        {survivors.map((p, i) => (
          <div className="my-2" key={i}>
            {p.name}
          </div>
        ))}
        {survivors.length == 0 && <div>No survivors... </div>}
      </div>

      <hr />
      <div>In memory of</div>
      <div>
        {fallen.map((p, i) => (
          <div className="my-2" key={i}>
            {p.name}
          </div>
        ))}
      </div>
      <div>My damaged brain {" (Please help me design of the page.)"}</div>
      <div>
        <button
          className="font-klee bg-black text-white mt-10 rounded-lg py-2 px-2 drop-shadow-md"
          onClick={handleReady}
        >
          Play again!
        </button>
      </div>

      {/* <div>Show stats?</div> */}
      <img
        src={gameImages["door-close"]}
        alt="Door"
        width={45}
        className="footer"
        onClick={() => setConfirm(true)}
      />
      {/* <button onClick={debug}>Debug game end</button> */}
    </div>
  );
};

export default Gameend;
