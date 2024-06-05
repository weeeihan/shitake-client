import { useContext, useEffect, useRef, useState } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
import * as images from "../assets/images/images";
import { play, useInterval, getY, getX } from "../utils/utils";
import { animate, motion } from "framer-motion";

const Test = () => {
  // GENERATE PLAY ORDER BEFORE RENDER
  // GET DESX AND DESY BEFORE RENDER

  const [data, setData] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 6, 7, 8],
    [5, 5, 5, 5, 5],
    [8, 9],
  ]);

  const constdata = [
    [1, 2, 3],
    [4, 5, 6, 7, 8],
    [5, 5, 5, 5, 5],
    [8, 9],
  ];

  const rawPlayed = {
    "Player 1": 40,
    "Player 2": 25,
    "Player 3": 30,
    "Player 4": 22,
    "Player 5": 10,
    "Player 6": 6,
    "Player 7": 18,
  };

  let played: number[][] = [];

  const [index, setIndex] = useState<number>(0);

  if (played.length == 0) {
    played = play(rawPlayed, constdata);
  }
  // Played = [name, played number, desY, desX]

  const Spore = ({ num }: { num: number }) => {
    return (
      <div className=" w-14 h-14 flex rounded-full bg-slate-300 justify-center items-center border-2 border-black text-[1.5rem]">
        {num}
      </div>
    );
  };

  function showPlay(p: number[]) {
    let temp = data;
    let row = p[2];
    if (temp[row].length === 5) {
      temp[row] = [p[1]];
      return temp;
    }
    temp[row].push(p[1]);
    return temp;
  }

  const debug = () => {
    console.log(document.documentElement.clientWidth);
  };

  function getDesY(p: number) {
    let vh = document.documentElement.clientHeight;
    // now space between is 5vh, and the height of the log is 6vh so total 11vh
    // thus 0.11 * vh
    return -133 - (3 - p) * 0.11 * vh;
  }

  function getDesX(p: number) {
    let vw = document.documentElement.clientWidth;

    // vw / 2 is the rightmost location
    // since each mushroom is 18% vw apart, vw*0.18
    // and the additional 50 is really just to offset to right
    let dMush = vw * 0.18 >= 100 ? 100 : vw * 0.18;

    return vw / 2 - dMush * (6 - p);
    // return -150 + (p - 1) * 80;
  }

  const Farming = () => {
    // console.log(index);
    if (index < played.length) {
      return (
        <div className="flex flex-col items-center justify-center mt-20">
          <motion.div
            key={index}
            variants={{
              one: {
                opacity: 0,
                transition: { delay: 1 },
              },
              two: {
                opacity: 1,

                // transition: { duration: 1 },
              },
              three: {
                y: getDesY(played[index][2]),
                x: getDesX(played[index][3]),
                transition: { delay: 0.5, duration: 0.8 },
              },
              four: {
                scale: 0,
                transition: { delay: 1, duration: 0.8 },
              },
            }}
            animate={["one", "two", "three", "four"]}
            // exit={{ opacity: 0 }}
            // initial={{ opacity: 0 }}
            // animate={{ y: -50, opacity: 1 }}
            // transition={{
            //   type: "spring",
            //   damping: 10,
            //   stiffness: 100,
            //   delay: 0.5,
            //   duration: 5,
            // }}
          >
            <Spore num={played[index][1]} />
          </motion.div>
          <div>{played[index][0]}</div>
        </div>
      );
    }

    return (
      <div className="mt-20">
        {played.map((p, index) => (
          <div key={index}>
            {p[0]}: {p[1]}
          </div>
          // <div key={index}>
          // </div>
        ))}
      </div>
    );
  };

  useInterval(() => {
    if (index < played.length) {
      console.log("here?");
      showPlay(played[index]);
      // setData(showPlay(played[index]));
      setIndex(index + 1);
    }
  }, 1500);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <div>This is test page</div> */}
      <div className="flex  max-w-[430px] w-[100vw] flex-col mt-9 justify-left space-y-[5vh] ">
        {data != null &&
          data.map((row: number[], rowNumber: number) => (
            <div
              key={rowNumber}
              className="inline-flex -space-x items-center cursor-pointer"
            >
              {row.map((card: number, cardNumber: number) => (
                <div key={cardNumber} className="relative ">
                  <div className="absolute">
                    <img
                      className="w-[12vw] max-w-[50px]"
                      src={images.mush2}
                      alt="Mushroom"
                      style={{ marginTop: getY(card), marginLeft: getX(card) }}
                    />
                  </div>
                  <div className=" ">
                    <img
                      src={images.hLog}
                      alt="Horizontal Log"
                      className="w-[18vw] h-[6vh] max-w-[100px] min-h-[50px]"
                    />
                  </div>
                </div>
              ))}
              <div className="ml-1 text-[1.2rem]">{row[row.length - 1]}</div>
            </div>
          ))}
      </div>
      <div>
        <Farming />
      </div>
      <div>
        <button onClick={debug}>debug</button>
      </div>
    </div>
  );
};

export default Test;
