// Functions
import React, { useContext } from "react";
import * as utils from "../utils/utils";

// Contexts
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";

// UI
import { PlayerDisplay } from "../utils/struct";

const Lobby = () => {
  const {
    gameData: { player, room },
    gameStates: { isAlready },
    setGameStates,
    gameConstants: { State },
    gameImages,
  } = useContext(GamestateContext);
  const { conn } = useContext(WebsocketContext);

  const handleStartGame = () => {
    if (conn !== null) {
      conn.send(utils.actions(State.START));
    }
  };

  const handleClick = (
    e: React.SyntheticEvent,
    name: string,
    isBot: boolean
  ) => {
    e.preventDefault();
    if (name == player.name) {
      if (conn != null) {
        if (player.ready == false) {
          conn.send(utils.actions(State.READY));
        } else {
          conn.send(utils.actions(State.UNREADY));
        }
      }
    }

    if (isBot) {
      // prompt if wanna remove bot
      if (conn != null) {
        conn.send(utils.actions(State.REMOVEBOT, ...[, ,], name));
      }
    }
  };

  const addBot = () => {
    if (conn != null) {
      conn.send(utils.actions(State.ADDBOT));
    }
  };

  const players = utils.SortPlayers(room.players);

  return (
    <div>
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
          <img
            style={isAlready ? {} : { display: "none" }}
            width={130}
            alt="All ready shroom"
            src={gameImages.startButton}
            className="cursor-pointer z-10 absolute -mt-[6rem] mr-1"
            onClick={handleStartGame}
          />

          <div
            className="cursor-pointer z-10 absolute font-pressStart text-3xl -mt-[4.5rem]"
            style={isAlready ? {} : { display: "none" }}
            onClick={handleStartGame}
          >
            START
          </div>

          {players.map((p: PlayerDisplay, index: number) => (
            <div key={index} className="-my-8">
              <img
                src={p.ready ? gameImages.readymush : gameImages.mush2}
                width={80}
                alt="player mushrooms!"
                className={
                  index % 2 == 0
                    ? "z-10 absolute drop-shadow-lg cursor-pointer ml-[2.3rem] "
                    : "absolute scale-x-[-1] drop-shadow-lg -ml-[3.5rem] cursor-pointer"
                }
                onClick={(e) => handleClick(e, p.name, p.isBot)}
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
                src={gameImages.vlog}
                alt="Vertical log"
                width={60}
                className="drop-shadow-lg "
              />
            </div>
          ))}
          <div className="-my-8">
            <img
              src={gameImages.mush2}
              width={80}
              alt="player mushrooms!"
              className={
                room.players.length % 2 == 0
                  ? "z-10 absolute drop-shadow-lg cursor-pointer ml-[2.3rem] opacity-50"
                  : "absolute scale-x-[-1] drop-shadow-lg -ml-[3.5rem] cursor-pointer opacity-30"
              }
              onClick={addBot}
            />
            <span
              className="font-patrick tracking-wide absolute opacity-50"
              style={{
                marginLeft: room.players.length % 2 == 0 ? 120 : -80,
              }}
            >
              Add
            </span>
            <img
              src={gameImages.vlog}
              alt="Vertical log"
              width={60}
              className="drop-shadow-lg "
            />
          </div>
          <img
            src={gameImages.vlog}
            alt="Vertical log"
            width={60}
            className=" drop-shadow-lg "
          />

          <div>
            <img
              src={gameImages["door-close"]}
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
          <button onClick={() => console.log(player)}>debug</button>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
