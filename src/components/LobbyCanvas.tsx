import React, { useState } from "react";
import { Player, PlayerDisplay, Room } from "../utils/struct";
import * as images from "../assets/images/images";
import * as utils from "../utils/utils";

type Props = {
  player: Player;
  roomData: Room;
  handleReady: (e: React.SyntheticEvent) => void;
  handleLeaveRoom: (e: React.SyntheticEvent) => void;
  isAlready: boolean;
  handleStartGame: () => void;
};

const LobbyCanvas = ({
  player,
  roomData,
  handleReady,
  handleLeaveRoom,
  isAlready,
  handleStartGame,
}: Props) => {
  const [over, setOver] = useState(false);
  const [onLeave, setOnLeave] = useState(false);
  const players = utils.SortPlayers(roomData.players);

  const handleLeave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOnLeave(true);
  };

  const handleStay = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOnLeave(false);
    setOver(false);
  };

  // If leaving
  if (onLeave)
    return (
      <div className="text-center flex flex-col items-center">
        <div className="font-patrick text-2xl my-20 tracking-wide">
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
            onClick={handleStay}
          >
            NO{" "}
          </span>
        </div>

        <img
          src={over || onLeave ? images.doorOpen : images.doorClose}
          alt="Door"
          width={45}
          className="  drop-shadow-lg  "
          onClick={handleLeave}
        />
      </div>
    );

  return (
    <>
      <div className="text-7xl pl-7 py-10 text-center font-patrick tracking-superWide">
        {roomData.id}
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
      <div className="  flex flex-col relative  mt-[7rem] items-center h-screen">
        {isAlready && (
          <>
            <img
              width={130}
              alt="All ready shroom"
              src={images.startButton}
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
          <div key={index} className="-my-3">
            <img
              src={p.ready ? images.readyMush : images.mush2}
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
              className={
                index % 2 == 0
                  ? "font-patrick tracking-wide absolute"
                  : "font-patrick tracking-wide absolute"
              }
              style={{
                marginLeft: index % 2 == 0 ? 120 : -60 - 8 * p.name.length,
              }}
            >
              {p.name}
            </span>
            <img
              src={images.vLog}
              alt="Vertical log"
              width={60}
              className="drop-shadow-lg "
            />
          </div>
        ))}
        <img
          src={images.vLog}
          alt="Vertical log"
          width={60}
          className=" drop-shadow-lg "
        />

        <div
          onMouseOver={() => setOver(true)}
          onMouseLeave={() => setOver(false)}
        >
          <img
            src={over || onLeave ? images.doorOpen : images.doorClose}
            alt="Door"
            width={45}
            className="relative -mt-[4.75rem] drop-shadow-lg cursor-pointer "
            onClick={handleLeave}
          />
        </div>
      </div>
    </>
  );
};

export default LobbyCanvas;
