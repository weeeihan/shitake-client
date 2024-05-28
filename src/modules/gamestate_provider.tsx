import React, { useState, createContext, useEffect } from "react";
import { GetID } from "../utils/utils";
import {
  GameData,
  GameConstants,
  GameStates,
  Player,
  Room,
} from "../utils/struct";
import * as handlers from "../utils/handlers";
import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";

export const GamestateContext = createContext<{
  navigate: NavigateFunction;
  gameConstants: GameConstants;
  gameStates: GameStates;
  gameData: GameData;
  setGameData: React.Dispatch<React.SetStateAction<GameData>>;
  setGameStates: React.Dispatch<React.SetStateAction<GameStates>>;
}>({
  navigate: () => {},
  gameConstants: { State: null, Mushrooms: null },
  gameStates: {
    isAlready: false,
    handToggle: true,
    showPlaying: false,
    bottomDisp: "Dashboard",
    currentDeck: [],
    hand: [],
    selected: -1,
  },
  setGameStates: () => {},
  gameData: {
    player: {} as Player,
    roomData: {} as Room,
  },
  setGameData: () => {},
});

const GamestateProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [selected, setSelected] = useState<number>(-1);
  // const [hand, setHand] = useState<number[]>([]);

  const [gameConstants, setGameConstants] = useState<GameConstants>({
    State: null,
    Mushrooms: null,
  });

  const [gameStates, setGameStates] = useState<GameStates>({
    isAlready: false,
    handToggle: true,
    showPlaying: false,
    bottomDisp: "Dashboard",
    currentDeck: [],
    hand: [],
    selected: -1,
  });

  const [gameData, setGameData] = useState<GameData>({
    player: {
      id: "",
      name: "",
      hp: 0,
      hand: [],
      ready: false,
      play: 0,
    },
    roomData: {
      id: "",
      state: "",
      players: [],
      deck: [],
      chooser: "",
      played: null,
    },
  });

  const id = GetID();

  function getData(id: string) {
    handlers.GetPlayer(id, setGameData);
    handlers.GetRoom(id, setGameData);
  }

  function redirect(des: string) {
    if (location.pathname === "/test") return;
    if (location.pathname === des) return;
    navigate(des);
  }

  useEffect(() => {
    handlers.GetMushrooms(setGameConstants);
    handlers.GetStates(setGameConstants);
  }, []);

  useEffect(() => {
    let State = gameConstants.State;
    if (id == "none") {
      redirect("/");
      setGameStates((prevState: GameStates) => ({
        ...prevState,
        bottomDisp: "Dashboard",
      }));
      return () => {};
    }

    if (State !== null) {
      getData(id);
    }
  }, [gameConstants, location]);

  // REDIRECT!
  useEffect(() => {
    let roomData = gameData.roomData;
    if (roomData.id !== "") {
      let State = gameConstants.State;
      if (roomData.id == "ERROR") {
        redirect("/");
        return () => {};
      }

      switch (roomData.state) {
        case State.INIT:
          redirect("/lobby");
          break;

        case State.CHOOSE_CARD:
          redirect("/game");
          break;

        case State.CHOOOSE_ROW:
          redirect("/game");
          break;

        case State.ROUND_END:
          redirect("/roundend");
          break;
      }
    }
  }, [gameData.roomData]);

  useEffect(() => {
    let player = gameData.player;
    if (player.id !== "") {
      setGameStates((prevState: GameStates) => ({
        ...prevState,
        hand: player.hand,
      }));
      if (player.play !== -1) {
        setGameStates((prevState: GameStates) => ({
          ...prevState,
          selected: player.play,
          hand: player.hand.filter((num) => num !== player.play),
        }));
      }
    }
  }, [gameData.player]);

  // useEffect(() => {
  //   const id = GetID();
  //   if (id !== "none") {
  //     getData(id);
  //   }
  // }, [location]);)

  if (gameConstants.State === null || gameConstants.State === null) {
    if (location.pathname !== "/test") return <div>Loading gamestates...</div>;
  }

  if (
    location.pathname !== "/" &&
    (gameData.player.id === "" || gameData.roomData.id === "")
  ) {
    if (location.pathname !== "/test") return <div>Loading data...</div>;
  }

  return (
    <GamestateContext.Provider
      value={{
        navigate: navigate,
        gameConstants: gameConstants,
        gameStates: gameStates,
        setGameStates: setGameStates,
        gameData: gameData,
        setGameData: setGameData,
      }}
    >
      {children}
    </GamestateContext.Provider>
  );
};

export default GamestateProvider;
