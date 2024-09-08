import { useContext, useState } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
import { useInterval, actions, getTotalDamge } from "../utils/utils";

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
    setGameState,
    gameConstants: { State },
    gameData: { room },
    gameStates: { currentDeck },
  } = useContext(GamestateContext);

  const { conn } = useContext(WebsocketContext);

  // const copyDeck = [...roomData.deck];
  const moves = room.moves;

  const [index, setIndex] = useState<number>(0);
  const [eats, setEats] = useState<string[]>([]);

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
    setEats([]);

    if (desX == 0 || temp[row].length === 5) {
      let dmg = getTotalDamge(temp[row], room.mushrooms);
      setEats([p[0], row.toString(), dmg.toString()]);
      temp[row] = [num];
      return temp;
    }

    if (temp[row].length) temp[row].push(num);
    return temp;
  }

  function getDesY(p: number) {
    // now space between is 5vh, and the height of the log is 6vh so total 11vh
    // thus 0.11 * vh
    return -100 - (3 - p) * 98;
    // return -70 - 98 - 98 - 98;
  }

  function getDesX(p: number) {
    // Width of the log
    if (p == 0) p += 1;

    let vw = document.documentElement.clientWidth;

    // clamp viewport
    if (vw > 400) {
      vw = 400;
    }
    let width = 0.18 * vw;

    // console.log("vw: ", vw);
    // console.log("divRef: ", divRef.current?.clientWidth);
    // console.log("width: ", width);
    // - (vw/2 - 0.5*width) is initial position. vw/2 is leftmost, we go right by 0.5 of the log width
    // Then we move down the log in increments of width
    // console.log("X: ", -(vw / 2 - 0.5 * width) + (p - 1) * width);
    return -(vw / 2 - 0.5 * width) + (p - 1) * width;
  }

  const nextPlay = () => {
    setGameState({
      handToggle: true,
      bottomDisp: "Dashboard",
      showPlaying: false,
    });

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

  const Eating = () => {
    if (eats.length != 0) {
      let r = Number(eats[1]);
      r += 1;
      return (
        <div className="text-2xl text-center">
          {eats[0] + " - " + eats[2] + "% HP"}{" "}
        </div>
      );
    }
    return null;
  };

  const Farming = () => {
    // console.log(index);
    if (index < moves.length && currentDeck.length > 0) {
      return (
        <div className="flex flex-col items-center mt-10 justify-center">
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
      return;
    }

    if (index < moves.length) {
      console.log("here?");
      showPlay(moves[index]);
      setIndex(index + 1);
    } else {
      setEats([]);
    }
  }, 1500);

  return (
    <div {...doubleTap} className="flex h-screen  flex-col items-center ">
      <div {...doubleTap} className="relative z-1 ">
        {currentDeck.length === 0 ? (
          <Deck data={room.deck} />
        ) : (
          <Deck data={currentDeck} />
        )}
      </div>
      <div {...doubleTap} className="relative z-10">
        <Farming />
      </div>
      <div>
        <Eating />
      </div>
      <div {...doubleTap} className=" footer">
        {"Double tap anywhere to continue"}
      </div>
    </div>
  );
};

export default Playing;
