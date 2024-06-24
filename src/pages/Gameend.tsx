import { useContext, useState } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
import { WebsocketContext } from "../modules/websocket_provider";
import { actions, getResults } from "../utils/utils";

const Gameend = () => {
  const {
    gameConstants: { State },
    gameData: { room },
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

  const debug = () => {
    console.log(room);
  };

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
    <div className="py-[7rem]">
      <div>Survivors</div>
      <div>
        {survivors.map((p, i) => (
          <div key={i}>{p.name}</div>
        ))}
        {survivors.length == 0 && <div>No survivors... </div>}
      </div>

      <hr />
      <div>In memory of</div>
      <div>
        {fallen.map((p, i) => (
          <div key={i}>{p.name}</div>
        ))}
      </div>
      <div>
        <button onClick={handleReady}>Play again!</button>
      </div>
      <div>
        <button onClick={() => setConfirm(true)}>Back to lobby </button>
      </div>
      <div>Show stats?</div>
      <button onClick={debug}>Debug game end</button>
    </div>
  );
};

export default Gameend;
