import React, { useContext, useEffect, useState } from "react";
import * as images from "../assets/images/images";
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";
import { actions, getTotalDamge, getX, getY } from "../utils/utils";
import { GameStates } from "../utils/struct";
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
  const handleChosen = (e: React.SyntheticEvent, rowNumber: number) => {
    e.preventDefault();
    setChoice(rowNumber);
    setHasChosen(true);
  };

  const handleChoose = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (conn !== null) {
      conn.send(actions(State.ROW, chosenCard, choice));
    }
    setHasChosen(false);
    console.log("Chose!");
  };

  const checkLog = (row: number) => {
    setIsChecking(row);
    setGameStates((prevState: GameStates) => ({
      ...prevState,
      bottomDisp: "Blank",
      handToggle: false,
    }));
  };

  const checkLogOff = () => {
    setIsChecking(-1);
    setGameStates((prevState: GameStates) => ({
      ...prevState,
      bottomDisp: "Dashboard",
      handToggle: true,
    }));
  };

  if (isChecking !== -1 && !isChooser) {
    let row = data[isChecking];
    return (
      <>
        <div onClick={checkLogOff}>
          <div className="-mt-[3rem] mb-[2rem] text-[.8rem]">
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
          <div className="font-patrick text-2xl  tracking-wide">
            Total damage: {getTotalDamge(row, Mushrooms)}%
          </div>
        </div>
      </>
    );
  }

  const confirm = () => {
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
  };

  return (
    <>
      {isChooser ? (
        <div>
          <div className="-mt-[2rem] mb-[2rem]">Choose a row to eat!</div>
          {hasChosen ? (
            <>{confirm()}</>
          ) : (
            <div className="grid gap-4 ">
              {data != null &&
                data.map((row: number[], rowNumber: number) => (
                  <div
                    key={rowNumber}
                    className="flex my-[1rem] cursor-pointer"
                    onClick={(e) => handleChosen(e, rowNumber)}
                  >
                    {row.map((card: number, cardNumber: number) => (
                      <div key={cardNumber} className="relative">
                        <img
                          src={images.hLog}
                          alt="Horizontal Log"
                          width={80}
                        />
                        <img
                          className="absolute z-10"
                          src={images.mush2}
                          alt="Mushroom"
                          width={50}
                          style={{ marginTop: -70 }}
                        />
                      </div>
                    ))}
                    <div className="ml-1">{row[row.length - 1]}</div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div>
            {isChoosing && !isChooser && (
              <>Waiting {roomData.chooser} to choose a row</>
            )}
          </div>
          <div className="grid gap-4 ">
            {data != null &&
              data.map((row: number[], rowNumber: number) => (
                <div
                  key={rowNumber}
                  className="flex flex-row my-[1rem]"
                  onClick={() => checkLog(rowNumber)}
                >
                  {row.map((card: number, cardNumber: number) => (
                    <div key={cardNumber}>
                      <img src={images.hLog} alt="Horizontal Log" width={80} />
                      <img
                        className="absolute z-10"
                        src={images.mush2}
                        alt="Mushroom"
                        width={50}
                        style={{
                          marginTop: getY(card),
                          marginLeft: getX(card),
                        }}
                      />
                    </div>
                  ))}
                  <div className="ml-1">{row[row.length - 1]}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Deck;
