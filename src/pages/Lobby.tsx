// Functions
import React, { useContext, useState } from "react";
import * as utils from "../utils/utils";
import * as images from "../assets/images/images";
import { useNavigate } from "react-router-dom";

// Contexts
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";

// UI
import { PlayerDisplay } from "../utils/struct";

const Lobby = () => {
  const navigate = useNavigate();
  const {
    gameData: { player, room },
    gameStates: { isAlready, onLeave },
    setGameStates,
    gameConstants: { State },
  } = useContext(GamestateContext);
  const { conn } = useContext(WebsocketContext);

  const handleStartGame = () => {
    if (conn !== null) {
      conn.send(utils.actions(State.START));
    }
  };

  const handleLeaveRoom = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (conn !== null) {
      localStorage.clear();
      navigate("/");
      conn.send(utils.actions(State.LEAVE));
      setGameStates((prev: any) => ({
        ...prev,
        onLeave: false,
      }));
    }
  };

  const handleReady = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (conn != null) {
      if (player.ready == false) {
        conn.send(utils.actions(State.READY));
      } else {
        conn.send(utils.actions(State.UNREADY));
      }
    }
  };

  // const [over, setOver] = useState(false);
  // const [onLeave, setOnLeave] = useState(false);
  const players = utils.SortPlayers(room.players);

  // const players = [
  //   {
  //     name: "han",
  //     hp: 100,
  //     ready: false,
  //   },
  //   {
  //     name: "Joe",
  //     hp: 100,
  //     ready: false,
  //   },
  //   {
  //     name: "guy",
  //     hp: 100,
  //     ready: false,
  //   },
  // ];
  const debug = () => {
    console.log(player);
  };

  // If leaving
  if (onLeave)
    return (
      <div className="text-center flex flex-col items-center justify-center h-screen">
        <div className="font-patrick text-2xl my-10 tracking-wide">
          Leaving already? 😢
        </div>
        <div className="mb-10">
          <span
            className="cursor-pointer text-3xl font-patrick tracking-wide"
            onClick={handleLeaveRoom}
          >
            YES
          </span>
          <span className="text-3xl font-patrick tracking-wide mx-10">|</span>
          <span
            className="cursor-pointer text-3xl font-patrick tracking-wide"
            onClick={() =>
              setGameStates((prevState: any) => ({
                ...prevState,
                onLeave: false,
              }))
            }
          >
            NO{" "}
          </span>
        </div>

        <img
          src={utils.img("door-open")}
          alt="Door"
          width={45}
          className="  drop-shadow-lg  "
        />
      </div>
    );

  return (
    <div className="flex flex-col py-20 h-screen">
      <div className="text-7xl pl-7 py-10  text-center font-patrick tracking-superWide">
        {room.id}
      </div>
      {isAlready ? (
        <div className=" text-center font-patrick tracking-wide ">
          Click the start button (mushroom) to start!
        </div>
      ) : (
        <div className="text-center font-patrick tracking-wide">
          Click your mushroom when you're ready!
        </div>
      )}
      <div className="  flex flex-col relative items-center  mt-[7rem] ">
        {isAlready && (
          <>
            <img
              width={130}
              alt="All ready shroom"
              src={utils.img("startButton")}
              className="cursor-pointer z-10 absolute -mt-[6rem] mr-1"
              onClick={handleStartGame}
            />

            <div
              className="cursor-pointer z-10 absolute font-pressStart text-3xl -mt-[4.5rem]"
              onClick={handleStartGame}
            >
              START
            </div>
          </>
        )}
        {players.map((p: PlayerDisplay, index: number) => (
          <div key={index} className="-my-8">
            <img
              src={p.ready ? utils.img("readymush") : utils.img("mush2")}
              width={80}
              alt="player mushrooms!"
              className={
                index % 2 == 0
                  ? "z-10 absolute drop-shadow-lg cursor-pointer ml-[2.3rem] "
                  : "absolute scale-x-[-1] drop-shadow-lg -ml-[3.5rem] cursor-pointer"
              }
              onClick={
                player.name == p.name ? (e) => handleReady(e) : undefined
              }
            />
            <span
              className="font-patrick tracking-wide absolute"
              style={{
                marginLeft: index % 2 == 0 ? 120 : -60 - 8 * p.name.length,
              }}
            >
              {p.name}
            </span>
            <img
              src={utils.img("vlog")}
              alt="Vertical log"
              width={60}
              className="drop-shadow-lg "
            />
          </div>
        ))}
        <img
          src={utils.img("vlog")}
          alt="Vertical log"
          width={60}
          className=" drop-shadow-lg "
        />

        <div>
          <img
            src={utils.img("door-close")}
            alt="Door"
            width={45}
            className="relative -mt-[4.75rem] drop-shadow-lg cursor-pointer "
            onClick={() =>
              setGameStates((prevState: any) => ({
                ...prevState,
                onLeave: true,
              }))
            }
          />
        </div>
        <div>
          <button onClick={debug}>Debug</button>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
