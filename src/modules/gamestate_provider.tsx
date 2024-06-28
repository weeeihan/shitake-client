import React, { useState, createContext, Suspense } from "react";
import { GetID, img } from "../utils/utils";
import {
  GameData,
  GameConstants,
  GameStates,
  Message,
  Room,
} from "../utils/struct";
import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useImage } from "react-image";
import { GET_CONSTANTS_API, GET_DATA_API } from "../utils/api";

export const GamestateContext = createContext<{
  navigate: NavigateFunction;
  gameConstants: GameConstants;
  gameStates: GameStates;
  gameData: GameData;
  setGameStates: React.Dispatch<React.SetStateAction<GameStates>>;
  fetchData: any;
  gameImages: any;
  getMush: any;
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
    onLeave: false,
  },
  setGameStates: () => {},
  gameData: {} as GameData,
  fetchData: () => {},
  gameImages: {},
  getMush: (num: number): any => {},
});

const GamestateProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [gameImages, setGameImages] = useState<any>({});
  const [gameData, setGameData] = useState<GameData>({} as GameData);
  const [imageLoading, setImageLoading] = useState(true);

  const getMush = (num: number) => {
    const room = gameData.room;
    if (room.mushrooms[num] === undefined) {
      return room.mushrooms[0];
    }
    return room.mushrooms[num];
  };

  function redirect(des: string) {
    const loc = window.location;
    if (loc.pathname === "/test") return;
    if (loc.pathname === des) return;
    navigate(des);
  }

  let id = GetID();

  // Fetching image
  // const {
  //   data: images,
  //   isLoading: imageLoading,
  //   refetch: fetchImages,
  // } = useQuery({
  //   enabled: false,
  //   queryKey: ["images"],
  //   queryFn: async () => {

  // const Shiitake = await fetch(img("Shiitake"));
  // const blob = await Shiitake.blob();
  // const url = URL.createObjectURL(blob);
  // const images = {
  //       Shiitake: url,
  //     };
  //     return images;
  //   },
  // });

  const fetchImages = async (room: Room) => {
    console.log("Fetching Images");
    const baseImage = [
      "bagClose",
      "mush2",
      "readymush",
      "vlog",
      "hlog",
      "startButton",
      "door-close",
      "door-open",
    ];

    let imgs: any = {};

    for (const name of baseImage) {
      const raw = await fetch(img(name));
      const blob = await raw.blob();
      const url = URL.createObjectURL(blob);
      imgs[name] = url;
    }

    const Mushrooms = Object.keys(room.mushrooms);

    for (const mush of Mushrooms) {
      const name = room.mushrooms[mush].name;
      const raw = await fetch(img(name));
      const blob = await raw.blob();
      const url = URL.createObjectURL(blob);
      imgs[name] = url;
    }

    setGameImages((prev: any) => ({
      ...imgs,
    }));

    setImageLoading(false);
  };

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
    onLeave: false,
  });

  // Fetch API
  const fetchData = async (states: any, msg?: Message | undefined) => {
    id = GetID();
    if (id === "none") {
      redirect("/");
      setGameData({} as GameData);
      return;
    }
    console.log("Fetching Data");
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

    if (Object.keys(gameImages).length === 0) {
      fetchImages(room);
    }

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
      return;
    }
    if (player.end == 2) {
      redirect("/gameend");
      return;
    }

    if (room.state === State.INIT) {
      redirect("/lobby");
      // return;
    }

    if (room.state === State.PROCESS || room.state === State.ROUND_END) {
      setGameStates((prev: GameStates) => ({
        ...prev,
        handToggle: false,
        showPlaying: true,
      }));
    }

    if (room.state === State.CHOOSE_ROW) {
      setGameStates((prev: GameStates) => ({
        ...prev,
        currentDeck: room.deck,
        bottomDisp: "blank",
      }));
      redirect("/game");
    }

    if (room.state === State.CHOOSE_CARD) {
      setGameStates((prev: GameStates) => ({
        ...prev,
        currentDeck: room.deck,
      }));
      redirect("/game");
    }

    // Handle update based on websocket messages ========================
    // Ready messages
    if (m !== undefined) {
      if (m.state == State.REGISTERED) {
        setGameStates((prev) => ({
          ...prev,
          isAlready: false,
        }));
      }

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
        console.log("HERE");
        setGameStates((prev) => ({
          ...prev,
          handToggle: false,
          bottomDisp: "Blank",
          // currentDeck: room.deck,
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

  if (imageLoading && location.pathname !== "/") {
    return <div>Loading images...</div>;
  }

  // if (imageLoading) {
  //   return <div>Loading images...</div>;
  // }
  // console.log(images);

  return (
    <GamestateContext.Provider
      value={{
        navigate: navigate,
        gameConstants: {
          State: constants.states,
        },
        gameStates: gameStates,
        setGameStates: setGameStates,
        gameData: gameData,
        fetchData: fetchData,
        gameImages: gameImages,
        getMush: getMush,
      }}
    >
      {children}
    </GamestateContext.Provider>
  );
};

export default GamestateProvider;
