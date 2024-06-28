import React, { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";
import Img from "../components/Img";
import { actions, getTotalDamge, getX, getY, img } from "../utils/utils";
import { GameStates } from "../utils/struct";
import Spore from "./Spore";

const Deck = ({ data }: { data: number[][] }) => {
  const { conn } = useContext(WebsocketContext);

  const {
    gameData: { player, room },
    gameConstants: { State },
    getMush,
    setGameStates,
    gameImages,
  } = useContext(GamestateContext);
  // console.log(Mushrooms);
  // const data = room.deck;
  // console.log(room);
  // const data = [[1, 2, 3], [4, 5, 6, 7, 8], [8, 9], [10]];

  const [hasChosen, setHasChosen] = useState(false);
  const [choice, setChoice] = useState(0);
  const [isChecking, setIsChecking] = useState(-1);

  const isChooser = room.chooser === player.name;
  const isChoosing = room.chooser !== "";
  // const isChooser = true;

  if (player.id == "" || room.id == "") {
    return <div>Loading</div>;
  }

  const chosenCard = room.played.length == 0 ? "-1" : room.played[player.name];

  const handleRowClick = (e: React.SyntheticEvent, row: number) => {
    e.preventDefault();
    // Clicks are disbaled
    if (room.state !== State.CHOOSE_ROW && room.state !== State.CHOOSE_CARD) {
      return;
    }

    // If the player is a chooser
    if (isChooser) {
      setChoice(row);
      setHasChosen(true);
      return;
    }

    // If just checking row
    setIsChecking(row);
    setGameStates((prevState: GameStates) => ({
      ...prevState,
      bottomDisp: "Blank",
      handToggle: false,
    }));
  };

  const handleChoose = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (conn !== null) {
      conn.send(actions(State.ROW, chosenCard, choice));
    }
    setHasChosen(false);
    console.log("Chose!");
  };

  const checkLogOff = () => {
    setIsChecking(-1);
    setGameStates((prevState: GameStates) => ({
      ...prevState,
      bottomDisp: "Dashboard",
      handToggle: true,
    }));
  };

  // Checking row

  if ((isChecking !== -1 && !isChooser) || hasChosen) {
    let row: number[] = [];
    if (isChecking !== -1 && !isChooser) {
      row = data[isChecking];
    }
    if (hasChosen) {
      row = data[choice];
    }
    return (
      <>
        <div className="flex flex-col h-screen" onClick={checkLogOff}>
          <div className="text-[.8rem] my-10 flex flex-col items-center">
            {hasChosen ? (
              <div>{""}</div>
            ) : (
              <div>{"(Press anywhere to go back)"}</div>
            )}
          </div>
          {row.map((num: number, index: number) => (
            <div key={index} className="flex flex-row items-center">
              <img
                src={gameImages[getMush(num).name]}
                width={80}
                alt="player mushrooms!"
                className={" drop-shadow-lg cursor-pointer ml-[2.3rem] "}
              />
              <div className="font-patrick tracking-wide">
                {"["}
                {num}
                {"]"} {getMush(num).name}, {"("}Damage: {getMush(num).damage}%
                {")"}
              </div>
              {/* <span className="font-patrick tracking-wide absolute mt-[2rem] -ml-[5rem]">
              Special abilities (If any)
            </span> */}
            </div>
          ))}
          <div className="font-patrick text-2xl mt-20 tracking-wide flex justify-center">
            Total damage: {getTotalDamge(row, room.mushrooms)}%
          </div>
          {hasChosen && (
            <div className="flex flex-row justify-center mt-10">
              <span
                className="cursor-pointer text-3xl font-patrick tracking-wide"
                onClick={handleChoose}
              >
                EAT!
              </span>
              <span className="text-3xl font-patrick tracking-wide mx-10">
                |
              </span>
              <span
                className="cursor-pointer text-3xl font-patrick tracking-wide"
                onClick={() => setHasChosen(false)}
              >
                Nope.{" "}
              </span>
            </div>
          )}
        </div>
      </>
    );
  }

  // if (hasChosen) {
  //   let row: number[] = data[choice];
  //   return (
  //     <div className="mt-[2rem]">
  //       {row.map((card: number, index: number) => (
  //         <div key={index} className="">
  //           <img
  //             src={mushImage(Mushrooms[card].name)}
  //             width={50}
  //             alt="player mushrooms!"
  //             className={
  //               "z-10 absolute drop-shadow-lg cursor-pointer ml-[2.3rem] "
  //             }
  //           />
  //           <span className="font-patrick tracking-wide absolute ml-[6rem]">
  //             {"["}
  //             {card}
  //             {"]"} {Mushrooms[card].name}, {"("}Damage:{" "}
  //             {Mushrooms[card].damage}%{")"}
  //           </span>
  //           {/* <span className="font-patrick tracking-wide absolute mt-[2rem] -ml-[5rem]">
  //             Special abilities (If any)
  //           </span> */}
  //         </div>
  //       ))}
  //       <div className="font-patrick text-2xl mt-[2rem] tracking-wide">
  //         Total damage: {getTotalDamge(row, Mushrooms)}%, are you sure?
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex  max-w-[430px] w-[100vw] flex-col mt-9 justify-left space-y-[5vh] ">
        {data != null &&
          data.map((row: number[], rowNumber: number) => (
            <div
              key={rowNumber}
              className="flex flex-row -space-x-[0.1rem] items-center cursor-pointer"
              // onClick={(e) => handleRowClick(e, rowNumber)}
            >
              {row.map((num: number, cardNumber: number) => (
                <div key={cardNumber} className="relative ">
                  <div className="z-10 absolute">
                    <img
                      className="w-[15vw] max-w-[80px] drop-shadow-lg"
                      src={gameImages[getMush(num).name]}
                      alt="Mushroom"
                      style={{ marginTop: getY(num), marginLeft: getX(num) }}
                      onClick={(e) => handleRowClick(e, rowNumber)}
                    />
                  </div>
                  <div className=" ">
                    <img
                      src={gameImages.hlog}
                      alt="Horizontal Log"
                      className="w-[18vw] h-[6vh] max-w-[100px] min-h-[50px]"
                      onClick={(e: any) => handleRowClick(e, rowNumber)}
                    />
                  </div>
                </div>
              ))}
              <div className="ml-4 text-[1.5rem]">
                <span className="text-white text-[1rem]">{"m"}</span>
                {row[row.length - 1]}
              </div>
            </div>
          ))}
        {isChoosing && (
          <div className="flex flex-col justify-center items-center">
            <Spore n={room.played[room.chooser].toString()} />
            <div>{room.chooser}</div>
          </div>
        )}
        {isChooser && <div>Please choose a row to eat!</div>}
        {isChoosing && !isChooser && (
          <div>Waiting for {room.chooser} to eat...</div>
        )}
      </div>
    </div>
  );
};

export default Deck;
