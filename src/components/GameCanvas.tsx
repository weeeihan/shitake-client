import React, { useContext, useState } from "react";
import Deck from "./Deck";
import Hand from "./Hand";
import Dashboard from "./Dashboard";
import Playing from "./Playing";
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";

const GameCanvas = () => {
  let isChooser = false;
  const { bottomDisp, setBottomDisp, roomData } = useContext(GamestateContext);
  const { countDown } = useContext(WebsocketContext);
  const showHide = bottomDisp == "Hand" ? "Hide Hand" : "Show Hand";

  const debug = () => {
    console.log(roomData);
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
      </div>
    </>
  );
};

export default GameCanvas;
