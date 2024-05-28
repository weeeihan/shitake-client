import { useContext, useEffect, useRef, useState } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
import * as images from "../assets/images/images";
import { useInterval } from "../utils/utils";

const Test = () => {
  const { player } = useContext(GamestateContext);

  const [data, setData] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 6, 7, 8],
    [8, 9],
    [10],
  ]);

  const [played, setPlayed] = useState<number[]>([11, 12, 13, 14, 15, 16]);

  function play(spore: number) {
    let temp = [...data];
    let optimal = 0;
    let least = 10000;
    for (let i = 0; i < data.length; i++) {
      let row = data[i];

      if (row[row.length - 1] < spore && spore - row[row.length - 1] < least) {
        least = spore - row[row.length - 1];
        optimal = i;
      }
    }
    console.log(optimal);

    if (data[optimal].length === 5) {
      temp[optimal] = [spore];
      return temp;
    }

    temp[optimal].push(spore);
    console.log(temp);
    return temp;
  }

  function removeSpore(played: number[]) {
    const temp = [...played];
    // console.log(temp);
    // console.log("SLICE HERE");
    // console.log(temp.slice(1));
    return temp.slice(1);
  }

  useInterval(() => {
    if (played.length > 0) {
      setData(play(played[0]));
      setPlayed(removeSpore(played));
    }
  }, 1000);
  const debug = () => {
    console.log(player);
  };
  return (
    <div>
      <div>This is test page</div>
      <div className="grid gap-4 ">
        {data != null &&
          data.map((row: number[], rowNumber: number) => (
            <div key={rowNumber} className="flex my-[1rem] cursor-pointer">
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
              <div className="ml-1">{row[row.length - 1]}</div>
            </div>
          ))}
      </div>
      <button onClick={debug}>Debug</button>
      <div>{played[0]}</div>
    </div>
  );
};

export default Test;
