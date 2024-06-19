import React, { useState, createContext } from "react";
import { GetID } from "../utils/utils";
import { GameData, GameConstants, GameStates, Message } from "../utils/struct";
import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { GET_CONSTANTS_API, GET_DATA_API } from "../utils/api";

export const GamestateContext = createContext<{
  navigate: NavigateFunction;
  gameConstants: GameConstants;
  gameStates: GameStates;
  gameData: GameData;
  setGameStates: React.Dispatch<React.SetStateAction<GameStates>>;
  fetchData: any;
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
  fetchData: () => {},
});

const GamestateProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  function redirect(des: string) {
    if (location.pathname === "/test") return;
    if (location.pathname === des) return;
    navigate(des);
  }

  const [gameData, setGameData] = useState<GameData>({} as GameData);

  let id = GetID();

  // useQuery to fetch constants.
  const { data: constants, isLoading: constLoading } = useQuery({
    queryKey: ["constants"],
    queryFn: async () => {
      const res = await axios.get(GET_CONSTANTS_API);
      // After fetching constants, fetch room data
      fetchData(res.data.states);
      return res.data;
    },
  });

  // client side game states
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

  // Fetch API
  const fetchData = async (states: any, msg?: Message | undefined) => {
    id = GetID();
    console.log("Fetching");
    if (id === "none") {
      redirect("/");
      setGameData({} as GameData);
      return;
    }
    try {
      // const res = await refetch();
      const res = await axios.get(GET_DATA_API(id));
      handleData(states, res, msg);
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.data.Message === "Room does not exist") {
          localStorage.clear();
          redirect("/");
        }
      }
    }
  };

  // Handling data after fetched
  const handleData = (states: any, res: any, m?: Message | undefined) => {
    // console.log("HANDLING");
    // console.log(m.current);
    // console.log(m);

    if (m !== undefined) {
      console.log(m);
    }

    let [room, player, State] = [res.data.room, res.data.player, states];

    setGameData((prevState: GameData) => ({
      ...prevState,
      player: res.data.player,
      room: res.data.room,
    }));

    // Populate hand
    setGameStates((prevState: GameStates) => ({
      ...prevState,
      hand: player.hand,
    }));

    // Reset player choice
    if (player.play !== -1) {
      setGameStates((prevState: GameStates) => ({
        ...prevState,
        selected: player.play,
        hand: player.hand.filter((num: number) => num !== player.play),
      }));
    }

    // Handle redirections ==============================================

    if (player.end == 1) {
      redirect("/roundend");
    }
    if (player.end == 2) {
      redirect("/gameend");
    }

    if (room.state === State.INIT) {
      redirect("/lobby");
    }

    if (room.state === State.CHOOSE_CARD) {
      console.log("Setting current deck...");
      setGameStates((prev: GameStates) => ({
        ...prev,
        currentDeck: room.deck,
      }));
      redirect("/game");
    }

    // Handle update based on websocket messages ========================
    // Ready messages
    if (m !== undefined) {
      if (
        m.state == State.ALREADY ||
        m.state == State.UNREADY ||
        m.state == State.READY
      ) {
        if (m.state == State.ALREADY) {
          setGameStates((prev) => ({
            ...prev,
            isAlready: true,
          }));
        }
        if (m.state == State.UNREADY) {
          setGameStates((prev) => ({
            ...prev,
            isAlready: false,
          }));
        }
      }

      // Start game!
      if (m.state == State.START) {
        setGameStates((prev) => ({
          ...prev,
          isAlready: false,
          showPlaying: false,
        }));
      }

      // Show playing (During process)
      if (
        m.state == State.PROCESS ||
        m.state == State.ROUND_END ||
        m.state == State.GAME_END
      ) {
        setGameStates((prev) => ({
          ...prev,
          showPlaying: true,
          selected: -1,
        }));
      }

      // Handle row choosing
      if (m.state == State.CHOOSE_ROW) {
        setGameStates((prev) => ({
          ...prev,
          handToggle: false,
          bottomDisp: "Blank",
        }));
        // Hide hands
      }

      // Show playing
      if (m.state == State.ROW_SELECTED) {
        setGameStates((prev) => ({
          ...prev,
          showPlaying: true,
          selected: -1,
        }));
      }
    }
  };

  // Constant loading
  if (constLoading) {
    return <div>Loading States and mushrooms...</div>;
  }

  // Game data loading
  if (gameData.player === undefined && location.pathname !== "/") {
    return <div>Loading players and stuff</div>;
  }

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
        gameData: gameData,
        fetchData: fetchData,
      }}
    >
      {children}
    </GamestateContext.Provider>
  );
};

export default GamestateProvider;
