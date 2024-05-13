import React, { useContext, useState } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
import Playing from "../components/Playing";
import Dashboard from "../components/Dashboard";
import { WebsocketContext } from "../modules/websocket_provider";
import { actions } from "../utils/utils";
import Deck from "../components/Deck";

const Roundend = () => {
  const { roomData, State } = useContext(GamestateContext);
  const { conn } = useContext(WebsocketContext);
  const debug = () => {
    console.log(roomData);
  };
  const [ready, setReady] = useState(false);
  const handleReady = () => {
    setReady(true);
    if (conn !== null) {
      conn.send(actions(State.READY));
    }
  };

  return (
    <>
      <div>
        {ready ? (
          "Waiting for others..."
        ) : (
          <button onClick={handleReady}>Ready for next round</button>
        )}
      </div>
      <button onClick={debug}>debug</button>
      <div>
        <Deck />
        <Playing />
      </div>
      <div>Damage report:</div>
      <div>
        <Dashboard />
      </div>
    </>
  );
};

export default Roundend;
