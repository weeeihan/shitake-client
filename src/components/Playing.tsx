import { useContext, useState } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
import { useInterval, actions } from "../utils/utils";

import Deck from "../components/Deck";
import Spore from "../components/Spore";
import { motion } from "framer-motion";
import { WebsocketContext } from "../modules/websocket_provider";
import Played from "./Played";
import { useDoubleTap } from "use-double-tap";

const Playing = () => {
  const doubleTap = useDoubleTap(() => {
    nextPlay();
    console.log("Double Tapped");
  });
  const {
    navigate,
    setGameStates,
    gameConstants: { State },
    gameData: { room },
    gameStates: { currentDeck },
  } = useContext(GamestateContext);

  const { conn } = useContext(WebsocketContext);

  // const copyDeck = [...roomData.deck];
  const moves = room.moves;

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

    let temp = currentDeck;
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

    if (conn !== null && conn !== undefined) {
      if (room.state === State.ROUND_END) {
        conn.send(actions(State.ROUND_END));
        navigate("/roundend");
        return;
      }

      if (room.state === State.GAME_END) {
        conn.send(actions(State.GAME_END));
        navigate("/gameend");
        return;
      }

      conn.send(actions(State.NEXT_PLAY));
    }
  };

  const Farming = () => {
    // console.log(index);
    if (index < moves.length && currentDeck.length > 0) {
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
          >
            <Spore n={moves[index][1]} />
          </motion.div>
          <div>{moves[index][0]}</div>
        </div>
      );
    }

    return (
      <div className="mt-20 ">
        <Played moves={moves} />
      </div>
    );
  };

  useInterval(() => {
    if (currentDeck.length === 0) {
      console.log("NO DECK");
      return;
    }

    if (index < moves.length) {
      console.log("here?");
      showPlay(moves[index]);
      setIndex(index + 1);
    }
  }, 1500);

  return (
    <div {...doubleTap} className="flex h-screen flex-col items-center ">
      <div {...doubleTap} className="relative z-1">
        {currentDeck.length === 0 ? (
          <Deck data={room.deck} />
        ) : (
          <Deck data={currentDeck} />
        )}
      </div>
      <div {...doubleTap} className="relative z-10">
        <Farming />
      </div>
      <div {...doubleTap} className=" footer">
        {"Double tap anywhere to continue"}
      </div>
    </div>
  );
};

export default Playing;
