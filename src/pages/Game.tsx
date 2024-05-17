import React, { useContext, useEffect, useState } from "react";
import Deck from "../components/Deck";
import Hand from "../components/Hand";
import Dashboard from "../components/Dashboard";
import Playing from "../components/Playing";
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";
import { actions } from "../utils/utils";

// Store

const Game = () => {
  useEffect(() => {
    // console.log("AT GAME");
  }, []);
  const { bottomDisp, setBottomDisp, roomData, State } =
    useContext(GamestateContext);
  const { countDown, conn } = useContext(WebsocketContext);
  const showHide = bottomDisp == "Hand" ? "Hide Hand" : "Show Hand";

  const debug = () => {
    if (conn !== null) {
      conn.send(actions(State.PING));
    }
  };

  const clear = () => {
    localStorage.clear();
  };

  const handleShowHand = () => {
    if (bottomDisp == "Hand") return setBottomDisp("Dashboard");
    setBottomDisp("Hand");
  };

  // DISABLE USER TO CHECK HAND IF NUMBER OF HAND = 0
  return (
    <>
      <div className="flex flex-col justify-center mt-24">
        <Deck />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-row space-x-5 mb-5">
          {roomData.state === State.CHOOSE_CARD && (
            <button onClick={handleShowHand}>{showHide}</button>
          )}
        </div>
        {bottomDisp === "Hand" && <Hand />}

        {bottomDisp === "Dashboard" && <Dashboard />}
        {bottomDisp === "Playing" && <Playing />}
        {countDown !== 0 && <div>{countDown}</div>}
        <button onClick={debug}>Debug</button>
        <button onClick={clear}>Clear</button>
      </div>
    </>
  );
};

export default Game;
