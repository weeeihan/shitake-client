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
  };

  return (
    <>
      <div className="text-2xl font-reenie text-center mt-5">
        Shitake by Han.
      </div>
      {onLeave && (
        <div className="text-center">
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
        </div>
      )}
      {!onLeave && (
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
        </>
      )}
      <div className="  flex flex-col items-center justify-center h-screen">
        {isAlready && (
          <>
            <Image
              width={130}
              alt="All ready shroom"
              src={images.startButton}
              className="z-10 absolute bottom-[20rem]"
            />
          </>
        )}
        <div className="flex flex-col -space-y-28">
          {players.map((p: PlayerDisplay, index: number) => (
            <div key={index}>
              <Image
                src={p.ready ? images.readyMush : images.mush2}
                width={80}
                alt="player mushrooms!"
                className={
                  index % 2 == 0
                    ? "z-10 relative left-[2.6rem] top-16  drop-shadow-lg cursor-pointer"
                    : " relative right-[3rem] top-16 scale-x-[-1] drop-shadow-lg cursor-pointer"
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
                    ? "font-patrick tracking-wide relative left-[28.5rem]"
                    : "font-patrick tracking-wide relative text-center right-[28.7rem]"
                }
              >
                {p.name}
              </span>
              <Image
                src={images.vLog}
                alt="Vertical log"
                width={60}
                className="relative bottom-10 drop-shadow-lg left-[0.4rem]"
              />
            </div>
          ))}
          <Image
            src={images.vLog}
            alt="Vertical log"
            width={60}
            className=" relative top-16 drop-shadow-lg left-[0.4rem]"
          />
          <Image
            src={images.vLog}
            alt="Vertical log"
            width={60}
            className=" relative top-40 drop-shadow-lg left-[0.4em]"
          />
        </div>
        <div
          onMouseOver={() => setOver(true)}
          onMouseLeave={() => setOver(false)}
        >
          <Image
            src={over || onLeave ? images.doorOpen : images.doorClose}
            alt="Door"
            width={45}
            className="relative drop-shadow-lg cursor-pointer right-1 bottom-[24.75rem] "
            onClick={onLeaveHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Lobby;
