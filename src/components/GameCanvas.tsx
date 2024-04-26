import React, { useState } from "react";
import Deck from "./Deck";
import Hand from "./Hand";
import Dashboard from "./Dashboard";
import Playing from "./Playing";

type Props = {
  isChooser: boolean;
  chooseRow: (row: number) => void;
  deck: number[][];
  hand: number[];
  playCard: (card: number) => void;
  countDown: number;
};

const GameCanvas = ({
  chooseRow,
  deck,
  hand,
  isChooser,
  playCard,
  countDown,
}: Props) => {
  const [bottomDisp, setBottomDisp] = useState("Hand");

  return (
    <div className="flex flex-col items-center justify-center">
      <Deck data={deck} isChooser={isChooser} chooseRow={chooseRow} />
      <div className="flex flex-row space-x-5 mb-5">
        <button onClick={() => setBottomDisp("Hand")}>Hands</button>
        <button onClick={() => setBottomDisp("Dashboard")}>Dashboard</button>
        <button onClick={() => setBottomDisp("Playing")}>Playing</button>
        <button onClick={() => setBottomDisp("Loading")}>Loading</button>
      </div>
      {bottomDisp === "Hand" && <Hand data={hand} playCard={playCard} />}
      {bottomDisp === "Dashboard" && <Dashboard />}
      {bottomDisp === "Loading" && <div>Loading...</div>}
      {bottomDisp === "Playing" && <Playing />}
      {countDown !== 0 && <div>{countDown}</div>}
    </div>
  );
};

export default GameCanvas;
