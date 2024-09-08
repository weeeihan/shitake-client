import React, { useContext, useEffect, useRef, useState } from "react";
import Deck from "../components/Deck";
import Hand from "../components/Hand";
import Dashboard from "../components/Dashboard";
import Playing from "../components/Playing";
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";
import Draggable, { DraggableData } from "react-draggable";
import { actions, img } from "../utils/utils";

const Game = () => {
  const nodeRef = useRef(null);
  const {
    navigate,
    setGameState,
    gameStates: { bottomDisp, handToggle, showPlaying, showHideLoc, onLeave },
    gameConstants: { State },
    gameData: { room },
    gameImages,
  } = useContext(GamestateContext);
  const { countDown } = useContext(WebsocketContext);
  const { conn } = useContext(WebsocketContext);
  const [delta, setDelta] = useState([0, 0]);

  const [startpos, setStartpos] = useState<number[]>([]);
  let vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  // For processing the showhide button
  useEffect(() => {
    setGameState({ showHideLoc: [vw / 2 + 140 + delta[0], 370 + delta[1]] });
  }, [handToggle]);

  const handleLeave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (conn !== null) {
      localStorage.clear();
      conn.send(actions(State.LEAVE));
      navigate("/");
    }
  };

  const handleTouchStart = (data: DraggableData) => {
    setStartpos([data.x, data.y]);
  };

  const handleTouchEnd = (data: DraggableData) => {
    const endpos = [data.x, data.y];
    let d = [endpos[0] - startpos[0], endpos[1] - startpos[1]];
    // console.log(data.deltaX, ",", data.deltaY);
    // console.log(delta);
    setDelta([delta[0] + d[0], delta[1] + d[1]]);
    console.log(delta);

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
      setGameState({ bottomDisp: "Dashboard" });
      return;
    }
    setGameState({ bottomDisp: "Hand" });
  };

  const debug = () => {
    setGameState({ handToggle: !handToggle });
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

  if (onLeave) {
    return (
      <div className="text-center flex flex-col items-center justify-center h-screen">
        <div className="font-patrick text-2xl my-10 tracking-wide">
          Leaving already? 😢
        </div>
        <div className="mb-10">
          <span
            className="cursor-pointer text-3xl font-patrick tracking-wide"
            onClick={handleLeave}
          >
            YES
          </span>
          <span className="text-3xl font-patrick tracking-wide mx-10">|</span>
          <span
            className="cursor-pointer text-3xl font-patrick tracking-wide"
            onClick={() => setGameState({ onLeav: false })}
          >
            NO{" "}
          </span>
        </div>

        <img
          src={img("door-open")}
          alt="Door"
          width={45}
          className="  drop-shadow-lg  "
          // onClick={handleLeave}
        />
      </div>
    );
  }

  // DISABLE USER TO CHECK HAND IF NUMBER OF HAND = 0
  return (
    <div className="relative flex flex-col ">
      {countDown !== 0 && (
        <div
          className="absolute  z-[100] text-[20rem] opacity-70 "
          style={{ left: vw / 2 - 100 }}
        >
          {countDown}
        </div>
      )}
      {/*Show hide button*/}
      <div
        className="flex flex-col absolute z-[1000] "
        style={{
          marginLeft: showHideLoc[0],
          marginTop: showHideLoc[1],
        }}
      >
        {room.state === State.CHOOSE_CARD && handToggle && (
          <Draggable
            nodeRef={nodeRef}
            onStart={(_, data) => handleTouchStart(data)}
            onStop={(_, data) => handleTouchEnd(data)}
          >
            {/* Testing */}
            <div
              ref={nodeRef}
              style={{
                width: 60,
                height: 60,
                background: `url(${img("bagClose")})`,
                backgroundSize: "cover",
              }}
            ></div>
            {/* <img src={img("bagClose")} alt="bag" width={60} /> */}
          </Draggable>
        )}
      </div>
      <div className="mb-9">
        <Deck data={room.deck} />
      </div>
      <div className="flex flex-col h-full items-center">
        {bottomDisp === "Blank" && <></>}
        {bottomDisp === "Hand" && <Hand />}
        {room.state != State.CHOOSE_ROW && bottomDisp === "Dashboard" && (
          <div className="w-full flex flex-col items-center justify-center">
            <Dashboard />
            <img
              src={gameImages["door-close"]}
              alt="Door"
              width={45}
              className="mt-8"
              onClick={() => setGameState({ onLeave: true })}
            />
          </div>
        )}
        {/* {bottomDisp === "ChooseRow" && <div>Chossing row!</div>} */}
      </div>
      <button onClick={debug}>Debug</button>
    </div>
  );
};

export default Game;
