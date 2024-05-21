import React, { useContext, useEffect, useRef, useState } from "react";
import Deck from "../components/Deck";
import Hand from "../components/Hand";
import Dashboard from "../components/Dashboard";
import Playing from "../components/Playing";
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";
import Draggable from "react-draggable";

// Store

const Game = () => {
  const nodeRef = useRef(null);
  const { bottomDisp, setBottomDisp, roomData, State } =
    useContext(GamestateContext);
  const { countDown } = useContext(WebsocketContext);
  const showHide = bottomDisp == "Hand" ? "Hide Hand" : "Show Hand";

  const [startpos, setStartpos] = useState<number[]>([]);

  const debug = () => {
    // console.log
    // if (conn !== null) {
    //   conn.send(actions(State.PING));
    // }
  };

  const handleTouchStart = (event: any) => {
    const touch = event.touches[0];
    console.log("HOI");
    setStartpos([touch.clientX, touch.clientY]);
  };

  const handleTouchEnd = (event: any) => {
    console.log("END");
    const touch = event.changedTouches[0];
    const endpos = [touch.clientX, touch.clientY];
    const distance = Math.sqrt(
      Math.pow(endpos[0] - startpos[0], 2) +
        Math.pow(endpos[1] - startpos[1], 2)
    );
    console.log(distance);
    if (distance < 5) {
      // handleShowHand()
      console.log("click");
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
            <Draggable nodeRef={nodeRef}>
              <a
                ref={nodeRef}
                onTouchStart={handleTouchStart}
                onTouchEndCapture={handleTouchEnd}
              >
                <div>{showHide}</div>
              </a>
            </Draggable>
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
