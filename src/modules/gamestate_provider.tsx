import React, { useState, createContext, useEffect, useRef } from "react";
import { GetID } from "../utils/utils";
import {
  GameData,
  GameConstants,
  GameStates,
  Player,
  Room,
  DamageReport,
} from "../utils/struct";
import * as handlers from "../utils/handlers";
import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const GamestateContext = createContext<{
  navigate: NavigateFunction;
  gameConstants: GameConstants;
  gameStates: GameStates;
  gameData: GameData;
  setGameStates: React.Dispatch<React.SetStateAction<GameStates>>;
  refetchData: () => void;
  constants: any;
}>({
  navigate: () => {},
  gameConstants: {} as GameConstants,
  gameStates: {
    isAlready: false,
    handToggle: true,
    showPlaying: false,
    bottomDisp: "Dashboard",
    currentDeck: [],
    hand: [],
    selected: -1,
    played: [],
    prevPlayed: {},
    showHideLoc: [],
  },
  setGameStates: () => {},
  gameData: {} as GameData,
  refetchData: () => {},
  constants: {},
});

const GamestateProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  function redirect(des: string) {
    if (location.pathname === "/test") return;
    if (location.pathname === des) return;
    navigate(des);
  }

  const id = GetID();

  const {
    data: constants,
    isLoading: constLoading,
    isFetched: constFetched,
  } = handlers.FetchConstants();

  const [gameStates, setGameStates] = useState<GameStates>({
    isAlready: false,
    handToggle: true,
    showPlaying: false,
    bottomDisp: "Dashboard",
    currentDeck: [],
    hand: [],
    selected: -1,
    played: [],
    prevPlayed: {},
    showHideLoc: [165, 400],
  });

  if (id === "none") {
    redirect("/");
  }

  const {
    data,
    error: dataErr,
    isLoading: dataLoading,
    refetch: refetchData,
    isFetched: dataFetched,
  } = useQuery({
    queryKey: ["data", id],
    queryFn: () => handlers.FetchData(id),
    enabled: id !== "none",
    retry: 1,
  });

  // function getData(id: string) {
  //   handlers.GetPlayer(id, setGameData);
  //   handlers.GetRoom(id, setGameData);
  // }

  // // gameConstants

  useEffect(() => {
    refetchData();

    if (id !== "none" && data !== undefined && constants !== undefined) {
      let [room, player, State] = [data.room, data.player, constants.states];

      // Populate hand
      setGameStates((prevState: GameStates) => ({
        ...prevState,
        hand: player.hand,
      }));

      // Handler redirections
      if (room.state === State.INIT) {
        redirect("/lobby");
      }

      if (room.state === State.CHOOSE_CARD) {
        redirect("/game");
      }
    }
  }, [location, dataFetched]);

  // // REDIRECT!
  // useEffect(() => {
  //   let roomData = gameData.roomData;
  //   if (roomData.id !== "") {
  //     if (roomData.id == "ERROR") {
  //       redirect("/");
  //       return () => {};
  //     }

  //     switch (roomData.state) {
  //       case State.INIT:
  //         redirect("/lobby");
  //         break;

  //       case State.CHOOSE_CARD:
  //         setGameStates((prev: GameStates) => ({
  //           ...prev,
  //           currentDeck: roomData.deck,
  //         }));
  //         redirect("/game");
  //         break;

  //       case State.CHOOOSE_ROW:
  //         redirect("/game");
  //         break;

  //       case State.PROCESS:
  //         console.log("Processing");
  //         break;
  //     }
  //   }
  // }, [gameData.roomData]);

  // useEffect(() => {
  //   let player = gameData.player;
  //   if (player.id !== "") {
  //     setGameStates((prevState: GameStates) => ({
  //       ...prevState,
  //       hand: player.hand,
  //     }));
  //     if (player.play !== -1) {
  //       setGameStates((prevState: GameStates) => ({
  //         ...prevState,
  //         selected: player.play,
  //         hand: player.hand.filter((num) => num !== player.play),
  //       }));
  //     }
  //     if (player.end == 1) {
  //       redirect("/roundend");
  //     }
  //     if (player.end == 2) {
  //       redirect("/gameend");
  //     }
  //   }
  // }, [gameData.player]);

  if (constLoading) {
    return <div>Loading States and mushrooms...</div>;
  }

  if (dataLoading) {
    return <div>Loading game data...</div>;
  }

  if (dataErr !== null) {
    console.log(dataErr);
    if (dataErr instanceof AxiosError) {
      if (dataErr.response?.data.Message === "Room does not exist") {
        console.log("REDIRECT TO LANDING + Clear local");
        localStorage.clear();
        redirect("/");
        return;
      }
    }
  }

  // if (
  //   location.pathname !== "/" &&
  //   (gameData.player.id === "" || gameData.roomData.id === "")
  // ) {
  //   if (location.pathname !== "/test") return <div>Loading data...</div>;
  // }
  // console.log(data);

  return (
    <GamestateContext.Provider
      value={{
        navigate: navigate,
        gameConstants: {
          State: constants.states,
          Mushrooms: constants.mushrooms,
        },
        gameStates: gameStates,
        setGameStates: setGameStates,
        gameData: {
          player: data?.player,
          room: data?.room,
        },
        refetchData: refetchData,
        constants: constants,
      }}
    >
      {children}
    </GamestateContext.Provider>
  );
};

export default GamestateProvider;
