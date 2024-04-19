import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameCanvas from "../components/GameCanvas";

const Game = () => {
  const navigate = useNavigate();

  const [chosenCard, setChosenCard] = useState<number>(0);

  const playCard = (card: number) => {
    console.log("Played card " + card);
    setChosenCard(card);
    // if (conn != null && card != 0) {
    //   conn.send(actions(State.PLAY, card));
    // }
  };

  const chooseRow = (row: number) => {
    console.log(row);
    // setIsChooser(false);
    // console.log("Chose row " + row);
    // if (conn != null && row != -1) {
    //   conn.send(actions(State.ROW, chosenCard, row));
    // }
  };

  const testDeck: number[][] = [
    [46, 56, 98, 100],
    [12, 15, 23, 24],
    [1, 3, 5, 7],
    [9],
  ];
  const testHand: number[] = [1, 2, 3, 4, 55, 6, 7, 8, 94, 23, 13];
  const testScore: number = 20;

  return (
    <>
      <GameCanvas
        deck={testDeck}
        isChooser={false}
        chooseRow={chooseRow}
        playCard={playCard}
        hand={testHand}
      />
    </>
  );
};

export default Game;
