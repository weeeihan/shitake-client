import React, { useContext, useEffect, useRef, useState } from "react";
import Deck from "../components/Deck";
import Hand from "../components/Hand";
import Dashboard from "../components/Dashboard";
import Playing from "../components/Playing";
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";
import Draggable from "react-draggable";
import { GameStates } from "../utils/struct";

const Game = () => {
  let vw = document.documentElement.clientWidth;
  const showHideStyle = {
    marginLeft: "207px",
  };
  const nodeRef = useRef(null);
  const {
    setGameStates,
    gameStates: { bottomDisp, handToggle, showPlaying, showHideLoc },
    gameConstants: { State },
    gameData: { room, player },
  } = useContext(GamestateContext);
  const { countDown } = useContext(WebsocketContext);
  const showHide = bottomDisp == "Hand" ? "Hide Hand" : "Show Hand";
  const [delta, setDelta] = useState([0, 0]);

  const [startpos, setStartpos] = useState<number[]>([]);

  useEffect(() => {
    setGameStates((prevState: GameStates) => ({
      ...prevState,
      showHideLoc: [165 + delta[0], 400 + delta[1]],
    }));
  }, [handToggle]);

  const debug = () => {
    setGameStates((prevState: GameStates) => ({
      ...prevState,
      handToggle: !prevState.handToggle,
    }));
  };

  // console.log(showHideLoc);
  const handleTouchStart = (event: any) => {
    const touch = event.touches[0];
    setStartpos([touch.clientX, touch.clientY]);
  };

  const handleTouchEnd = (event: any) => {
    const touch = event.changedTouches[0];
    const endpos = [touch.clientX, touch.clientY];
    let d = [endpos[0] - startpos[0], endpos[1] - startpos[1]];

    console.log(delta);
    setDelta([delta[0] + d[0], delta[1] + d[1]]);

    const distance = Math.sqrt(
      Math.pow(endpos[0] - startpos[0], 2) +
        Math.pow(endpos[1] - startpos[1], 2)
    );
    if (distance < 5) {
      handleShowHand();
      // console.log("click");
    }
  };

  const handleShowHand = () => {
    if (bottomDisp == "Hand") {
      setGameStates((prevState: GameStates) => ({
        ...prevState,
        bottomDisp: "Dashboard",
      }));
      return;
    }
    setGameStates((prevState: GameStates) => ({
      ...prevState,
      bottomDisp: "Hand",
    }));
  };

  if (showPlaying) {
    if (room.moves.length === 0) {
      return <div>LOADING</div>;
    }
    return (
      <div>
        <Playing />
      </div>
    );
  }

  // DISABLE USER TO CHECK HAND IF NUMBER OF HAND = 0
  return (
    <>
      <div
        className="flex flex-col absolute"
        style={{ marginLeft: showHideLoc[0], marginTop: showHideLoc[1] }}
      >
        {room.state === State.CHOOSE_CARD && handToggle && (
          <Draggable nodeRef={nodeRef}>
            <a
              ref={nodeRef}
              onTouchStart={handleTouchStart}
              onTouchEndCapture={handleTouchEnd}
              className=""
            >
              <div>{showHide}</div>
            </a>
          </Draggable>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <Deck />
      </div>
      <div className="flex flex-col items-center mt-20">
        {bottomDisp === "Blank" && <></>}
        {bottomDisp === "Hand" && <Hand />}
        {bottomDisp === "Dashboard" && <Dashboard />}
        {/* {bottomDisp === "Playing" && <Playing />} */}
        {countDown !== 0 && <div>{countDown}</div>}
        {bottomDisp === "ChooseRow" && <div>Chossing row!</div>}
        <button onClick={debug}>Debug main game screen</button>
        {/* <button onClick={clear}>Clear</button> */}
      </div>
    </>
  );
};

export default Game;
