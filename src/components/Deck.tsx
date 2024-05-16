import React, { useContext, useState } from "react";
import * as images from "../assets/images/images";
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";
import { actions } from "../utils/utils";
const Deck = () => {
  const { conn } = useContext(WebsocketContext);
  const { player, roomData, State } = useContext(GamestateContext);

  const data = roomData.deck;

  const [hasChosen, setHasChosen] = useState(false);
  const [choice, setChoice] = useState(0);

  const isChooser = roomData.chooser === player.name;
  const isChoosing = roomData.chooser !== "";

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

  const confirm = () => {
    let row = data[choice];
    return (
      <>
        <div className="flex my-[1rem] cursor-pointer">
          {row.map((card: number, cardNumber: number) => (
            <div key={cardNumber} className="relative">
              <img src={images.hLog} alt="Horizontal Log" width={80} />
              <img
                className="absolute z-10"
                src={images.mush2}
                alt="Mushroom"
                width={50}
                style={{ marginTop: -70 }}
              />
            </div>
          ))}
        </div>
        <div className="font-patrick text-2xl my-20 tracking-wide">
          This row will deal XX damage, are you sure? your chosen card is :{" "}
          {chosenCard}
        </div>
        <div className="mb-10">
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
      </>
    );
  };

  return (
    <>
      {isChooser ? (
        <div>
          <div>Choose a row to eat!</div>
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
                <div key={rowNumber} className="flex flex-row my-[1rem]">
                  {row.map((card: number, cardNumber: number) => (
                    <div key={cardNumber}>
                      <img src={images.hLog} alt="Horizontal Log" width={80} />
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
        </div>
      )}
    </>
  );
};

export default Deck;
