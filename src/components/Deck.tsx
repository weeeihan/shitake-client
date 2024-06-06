import React, { useContext, useEffect, useState } from "react";
import * as images from "../assets/images/images";
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";
import { actions, getTotalDamge, getX, getY } from "../utils/utils";
import { GameStates } from "../utils/struct";
import Spore from "./Spore";

const Deck = () => {
  const { conn } = useContext(WebsocketContext);

  const {
    gameData: { player, roomData },
    gameConstants: { State, Mushrooms },
    setGameStates,
  } = useContext(GamestateContext);
  const data = roomData.deck;
  // const data = [[1, 2, 3], [4, 5, 6, 7, 8], [8, 9], [10]];

  const [hasChosen, setHasChosen] = useState(false);
  const [choice, setChoice] = useState(0);
  const [isChecking, setIsChecking] = useState(-1);

  const isChooser = roomData.chooser === player.name;
  const isChoosing = roomData.chooser !== "";
  // const isChooser = true;

  if (player.id == "" || roomData.id == "") {
    return <div>Loading</div>;
  }

  const chosenCard =
    roomData.played.length == 0 ? "-1" : roomData.played[player.name];

  const handleRowClick = (e: React.SyntheticEvent, row: number) => {
    e.preventDefault();
    if (isChooser) {
      setChoice(row);
      setHasChosen(true);
      return;
    }
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

  if (isChecking !== -1 && !isChooser) {
    let row = data[isChecking];
    return (
      <>
        <div className=" h-screen" onClick={checkLogOff}>
          <div className="text-[.8rem] my-10">
            {"(Press anywhere to go back)"}
          </div>
          {row.map((card: number, index: number) => (
            <div key={index} className="">
              <img
                src={images.mush2}
                width={50}
                alt="player mushrooms!"
                className={
                  "z-10 absolute drop-shadow-lg cursor-pointer ml-[2.3rem] "
                }
              />
              <span className="font-patrick tracking-wide absolute -ml-[5rem]">
                {"["}
                {card}
                {"]"} {Mushrooms[card].name}, {"("}Damage:{" "}
                {Mushrooms[card].damage}%{")"}
              </span>
              {/* <span className="font-patrick tracking-wide absolute mt-[2rem] -ml-[5rem]">
              Special abilities (If any)
            </span> */}
              <img
                src={images.vLog}
                alt="Vertical log"
                width={50}
                className="drop-shadow-lg "
              />
            </div>
          ))}
          <div className="font-patrick text-2xl mt-20 tracking-wide">
            Total damage: {getTotalDamge(row, Mushrooms)}%
          </div>
        </div>
      </>
    );
  }

  if (hasChosen) {
    let row = data[choice];
    return (
      <div className="mt-[2rem]">
        {row.map((card: number, index: number) => (
          <div key={index} className="">
            <img
              src={images.mush2}
              width={50}
              alt="player mushrooms!"
              className={
                "z-10 absolute drop-shadow-lg cursor-pointer ml-[2.3rem] "
              }
            />
            <span className="font-patrick tracking-wide absolute -ml-[5rem]">
              {"["}
              {card}
              {"]"} {Mushrooms[card].name}, {"("}Damage:{" "}
              {Mushrooms[card].damage}%{")"}
            </span>
            {/* <span className="font-patrick tracking-wide absolute mt-[2rem] -ml-[5rem]">
              Special abilities (If any)
            </span> */}
            <img
              src={images.vLog}
              alt="Vertical log"
              width={50}
              className="drop-shadow-lg "
            />
          </div>
        ))}
        <div className="font-patrick text-2xl mt-[2rem] tracking-wide">
          Total damage: {getTotalDamge(row, Mushrooms)}%, are you sure?
        </div>
        <div className="mb-10 mt-[2rem]">
          <span
            className="cursor-pointer text-3xl font-patrick tracking-wide"
            onClick={handleChoose}
          >
            YES
          </span>
          <span className="text-3xl font-patrick tracking-wide mx-10">|</span>
          <span
            className="cursor-pointer text-3xl font-patrick tracking-wide"
            onClick={() => setHasChosen(false)}
          >
            NO{" "}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex  max-w-[430px] w-[100vw] flex-col mt-9 justify-left space-y-[5vh] ">
        {data != null &&
          data.map((row: number[], rowNumber: number) => (
            <div
              key={rowNumber}
              className="inline-flex -space-x items-center cursor-pointer"
              // onClick={(e) => handleRowClick(e, rowNumber)}
            >
              {row.map((card: number, cardNumber: number) => (
                <div key={cardNumber} className="relative ">
                  <div className="absolute">
                    <img
                      className="w-[12vw] max-w-[50px]"
                      src={images.mush2}
                      alt="Mushroom"
                      style={{ marginTop: getY(card), marginLeft: getX(card) }}
                      onClick={(e) => handleRowClick(e, rowNumber)}
                    />
                  </div>
                  <div className=" ">
                    <img
                      src={images.hLog}
                      alt="Horizontal Log"
                      className="w-[18vw] h-[6vh] max-w-[100px] min-h-[50px]"
                      onClick={(e) => handleRowClick(e, rowNumber)}
                    />
                  </div>
                </div>
              ))}
              <div className="ml-1 text-[1.2rem]">{row[row.length - 1]}</div>
            </div>
          ))}
        {isChoosing && (
          <div className="flex flex-col justify-center items-center">
            <Spore n={roomData.played[roomData.chooser].toString()} />
            <div>{roomData.chooser}</div>
          </div>
        )}
        {isChooser && <div>Please choose a row to eat!</div>}
        {isChoosing && !isChooser && (
          <div>Waiting for {roomData.chooser} to eat...</div>
        )}
      </div>
    </div>
  );

  // return (
  //   <>
  //     {isChooser ? (
  //       <div>
  //         <div className="-mt-[2rem] mb-[2rem]">Choose a row to eat!</div>
  //         {hasChosen ? (
  //           <>{confirm()}</>
  //         ) : (
  //           <div className="grid gap-4 ">
  //             {data != null &&
  //               data.map((row: number[], rowNumber: number) => (
  //                 <div
  //                   key={rowNumber}
  //                   className="flex my-[1rem] cursor-pointer"
  //                   onClick={(e) => handleChosen(e, rowNumber)}
  //                 >
  //                   {row.map((card: number, cardNumber: number) => (
  //                     <div key={cardNumber} className="relative">
  //                       <img
  //                         src={images.hLog}
  //                         alt="Horizontal Log"
  //                         width={80}
  //                       />
  //                       <img
  //                         className="absolute z-10"
  //                         src={images.mush2}
  //                         alt="Mushroom"
  //                         width={50}
  //                         style={{ marginTop: -70 }}
  //                       />
  //                     </div>
  //                   ))}
  //                   <div className="ml-1">{row[row.length - 1]}</div>
  //                 </div>
  //               ))}
  //           </div>
  //         )}
  //       </div>
  //     ) : (
  //       <div>
  //         <div>
  //           {isChoosing && !isChooser && (
  //             <>Waiting {roomData.chooser} to choose a row</>
  //           )}
  //         </div>
  //         <div className="grid gap-4 ">
  //           {data != null &&
  //             data.map((row: number[], rowNumber: number) => (
  //               <div
  //                 key={rowNumber}
  //                 className="flex flex-row my-[1rem]"
  //                 onClick={() => checkLog(rowNumber)}
  //               >
  //                 {row.map((card: number, cardNumber: number) => (
  //                   <div key={cardNumber}>
  //                     <img src={images.hLog} alt="Horizontal Log" width={80} />
  //                     <img
  //                       className="absolute z-10"
  //                       src={images.mush2}
  //                       alt="Mushroom"
  //                       width={50}
  //                       style={{
  //                         marginTop: getY(card),
  //                         marginLeft: getX(card),
  //                       }}
  //                     />
  //                   </div>
  //                 ))}
  //                 <div className="ml-1">{row[row.length - 1]}</div>
  //               </div>
  //             ))}
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );
};

export default Deck;
