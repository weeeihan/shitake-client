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
};

const GameCanvas = ({ chooseRow, deck, hand, isChooser, playCard }: Props) => {
  const [bottomDisp, setBottomDisp] = useState("Hand");

  const handleState = (e: React.SyntheticEvent, state: string) => {
    setBottomDisp(state);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Deck data={deck} isChooser={isChooser} chooseRow={chooseRow} />
      <div className="flex flex-row space-x-5 mb-5">
        <button onClick={(e) => handleState(e, "Hand")}>Hands</button>
        <button onClick={(e) => handleState(e, "Dashboard")}>Dashboard</button>
        <button onClick={(e) => handleState(e, "Playing")}>Playing</button>
        <button onClick={(e) => handleState(e, "Loading")}>Loading</button>
      </div>
      {bottomDisp === "Hand" && <Hand data={hand} playCard={playCard} />}
      {bottomDisp === "Dashboard" && <Dashboard />}
      {bottomDisp === "Loading" && <div>Loading...</div>}
      {bottomDisp === "Playing" && <Playing />}
    </div>
  );
};

export default GameCanvas;
