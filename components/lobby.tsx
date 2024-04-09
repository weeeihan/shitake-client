import Image from "next/image";
import * as images from "@/components/images/images";
import * as utils from "@/utils/utils";
import { useState } from "react";

import { Player, PlayerDisplay, Room } from "@/structs/structs";

type Props = {
  player: Player;
  roomData: Room;
  readyHandler: (e: React.SyntheticEvent, name: string) => void;
  leaveRoomHandler: (e: React.SyntheticEvent) => void;
  isAlready: boolean;
};

const Lobby = ({
  player,
  roomData,
  readyHandler,
  leaveRoomHandler,
  isAlready,
}: Props) => {
  const [over, setOver] = useState(false);
  const [onLeave, setOnLeave] = useState(false);
  const players = utils.SortPlayers(roomData.players);

  const onLeaveHandler = (e: React.SyntheticEvent) => {
    if (!onLeave) {
      e.preventDefault();
      setOnLeave(true);
    }
  };

  const notLeaveHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOnLeave(false);
    setOver(false);
  };

  return (
    <>
      <div className="text-2xl font-reenie text-center mt-5">
        Shitake by Han.
      </div>
      {onLeave ? (
        <div className="text-center flex flex-col items-center">
          <div className="font-patrick text-2xl my-20 tracking-wide">
            Leaving already? 😢
          </div>
          <div className="mb-10">
            <span
              className="cursor-pointer text-3xl font-patrick tracking-wide"
              onClick={leaveRoomHandler}
            >
              YES
            </span>
            <span className="text-3xl font-patrick tracking-wide mx-10">|</span>
            <span
              className="cursor-pointer text-3xl font-patrick tracking-wide"
              onClick={notLeaveHandler}
            >
              NO{" "}
            </span>
          </div>

          <Image
            src={over || onLeave ? images.doorOpen : images.doorClose}
            alt="Door"
            width={45}
            className="  drop-shadow-lg  "
            onClick={onLeaveHandler}
          />
        </div>
      ) : (
        <>
          <div className="text-7xl pl-7 py-10 text-center font-patrick tracking-superWide">
            {roomData.id}
          </div>
          {isAlready ? (
            <div className="text-center font-patrick tracking-wide ">
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
                <Image
                  width={130}
                  alt="All ready shroom"
                  src={images.startButton}
                  className="z-10 absolute -mt-[6rem] mr-1"
                />

                <div className="z-10 absolute font-pressStart text-3xl -mt-[4.5rem]">
                  START
                </div>
              </>
            )}
            {players.map((p: PlayerDisplay, index: number) => (
              <div key={index} className="-my-3">
                <Image
                  src={p.ready ? images.readyMush : images.mush2}
                  width={80}
                  alt="player mushrooms!"
                  className={
                    index % 2 == 0
                      ? "z-10 absolute drop-shadow-lg cursor-pointer ml-[2.3rem] "
                      : "absolute scale-x-[-1] drop-shadow-lg -ml-[3.5rem] cursor-pointer"
                  }
                  onClick={
                    player.name == p.name
                      ? (e) => readyHandler(e, p.name)
                      : undefined
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
                <Image
                  src={images.vLog}
                  alt="Vertical log"
                  width={60}
                  className="drop-shadow-lg "
                />
              </div>
            ))}
            <Image
              src={images.vLog}
              alt="Vertical log"
              width={60}
              className=" drop-shadow-lg "
            />

            <div
              onMouseOver={() => setOver(true)}
              onMouseLeave={() => setOver(false)}
            >
              <Image
                src={over || onLeave ? images.doorOpen : images.doorClose}
                alt="Door"
                width={45}
                className="relative -mt-[4.75rem] drop-shadow-lg cursor-pointer "
                onClick={onLeaveHandler}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lobby;
