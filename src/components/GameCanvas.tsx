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

  const debug = () => {
    console.log(roomData);
  };

  // DISABLE USER TO CHECK HAND IF NUMBER OF HAND = 0
  return (
    <div className="flex flex-col items-center justify-center">
      <Deck />
      <div className="flex flex-row space-x-5 mb-5">
        <button onClick={() => setBottomDisp("Hand")}>Hands</button>
        <button onClick={() => setBottomDisp("Dashboard")}>Dashboard</button>
        <button onClick={() => setBottomDisp("Playing")}>Playing</button>
        <button onClick={() => setBottomDisp("Loading")}>Loading</button>
      </div>
      {bottomDisp === "Hand" && <Hand />}
      {bottomDisp === "Dashboard" && <Dashboard />}
      {bottomDisp === "Loading" && <div>Loading...</div>}
      {bottomDisp === "Playing" && <Playing />}
      {countDown !== 0 && <div>{countDown}</div>}
      <button onClick={debug}>Debug</button>
    </div>
  );
};

export default GameCanvas;
