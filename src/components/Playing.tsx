import React from "react";
import * as images from "../assets/images/images";
import useStore from "../utils/store";
import { Played } from "../utils/struct";

type Props = { playedCards: string };

const Playing = ({ playedCards }: Props) => {
  const store = useStore();
  const playedCardsArr = playedCards.split(" ");
  let played: Played[] = [];

  for (let i = 0; i < playedCardsArr.length; i++) {
    let p = playedCardsArr[i].split(":");
    played.push({
      name: p[0],
      card: p[1],
    });
  }

  // const played = [
  //   {
  //     name: "Han",
  //     played: 50,
  //   },
  //   {
  //     name: "Kelly",
  //     played: 55,
  //   },
  //   {
  //     name: "Jordan",
  //     played: 12,
  //   },
  // ];
  return (
    <>
      {store.isChooseRow ? <div>Row choosing phase!</div> : null}
      {played.map((p, index) => (
        <div key={index}>
          {p.name} played {p.card}
        </div>
      ))}
    </>
  );
};

export default Playing;
