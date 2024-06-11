import { useContext, useEffect, useState } from "react";
import * as images from "../assets/images/images";
import { GamestateContext } from "../modules/gamestate_provider";
import { useInterval, getX, getY, actions, play } from "../utils/utils";

import Spore from "../components/Spore";
import { motion } from "framer-motion";
import { WebsocketContext } from "../modules/websocket_provider";

const Playing = () => {
  const {
    navigate,
    setGameStates,
    gameConstants: { State },
    gameData: { roomData },
    gameStates: { currentDeck, handToggle },
  } = useContext(GamestateContext);

  const { conn } = useContext(WebsocketContext);

  // const copyDeck = [...roomData.deck];
  const moves = roomData.moves;
  const [deck, setDeck] = useState<number[][]>(currentDeck);

  const [index, setIndex] = useState<number>(0);

  // const Spore = ({ n }: { n: string }) => {
  //   let num = Number(n);
  //   return (
  //     <div className=" w-14 h-14 flex rounded-full bg-slate-300 justify-center items-center border-2 border-black text-[1.5rem]">
  //       {num}
  //     </div>
  //   );
  // };

  function showPlay(p: string[]) {
    // p = [name, played number, desY, desX]

    let temp = deck;
    let row = Number(p[2]);
    let num = Number(p[1]);
    let desX = Number(p[3]);

    if (desX == 0) {
      temp[row] = [num];
      return temp;
    }

    if (temp[row].length === 5) {
      temp[row] = [num];
      return temp;
    }

    if (temp[row].length) temp[row].push(num);
    return temp;
  }

  const debug = () => {
    console.log(handToggle);
  };

  function getDesY(p: number) {
    let vh = document.documentElement.clientHeight;
    // now space between is 5vh, and the height of the log is 6vh so total 11vh
    // thus 0.11 * vh
    return -133 - (3 - p) * 0.11 * vh;
  }

  function getDesX(p: number) {
    if (p == 0) p += 1;
    let vw = document.documentElement.clientWidth;

    // vw / 2 is the rightmost location
    // since each mushroom is 18% vw apart, vw*0.18
    // and the additional 50 is really just to offset to right
    let dMush = vw * 0.18 >= 100 ? 100 : vw * 0.18;

    return vw / 2 - dMush * (6 - p);
    // return -150 + (p - 1) * 80;
  }

  const nextPlay = () => {
    setGameStates((prev) => ({
      ...prev,
      handToggle: true,
      bottomDisp: "Dashboard",
      showPlaying: false,
    }));

    if (roomData.state === State.ROUND_END) {
      if (conn !== null) {
        conn.send(actions(State.ROUND_END));
        navigate("/roundend");
      }
    }

    if (roomData.state === State.GAME_END) {
      if (conn !== null) {
        conn.send(actions(State.GAME_END));
        navigate("/gameend");
      }
    }
  };

  const Farming = () => {
    // console.log(index);
    if (index < moves.length) {
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
                y: getDesY(Number(moves[index][2])),
                x: getDesX(Number(moves[index][3])),
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
            <Spore n={moves[index][1]} />
          </motion.div>
          <div>{moves[index][0]}</div>
        </div>
      );
    }

    return (
      <div className="mt-20">
        {moves.map((p, index) => (
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
    if (index < moves.length) {
      console.log("here?");
      showPlay(moves[index]);
      // setData(showPlay(played[index]));
      setIndex(index + 1);
    }
  }, 1500);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <div>This is test page</div> */}
      <div className="flex  max-w-[430px] w-[100vw] flex-col mt-9 justify-left space-y-[5vh] ">
        {deck != null &&
          deck.map((row: number[], rowNumber: number) => (
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
        <button onClick={nextPlay}>NEXT PLAY</button>
      </div>
      <div>
        <button onClick={debug}>debug</button>
      </div>
    </div>
  );
};

export default Playing;
