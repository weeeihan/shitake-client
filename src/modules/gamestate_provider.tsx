import React, { useState, createContext, useRef } from "react";
import { GetID, img } from "../utils/utils";
import {
  GameData,
  GameConstants,
  GameStates,
  Message,
  Room,
} from "../utils/struct";
// import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Loader from "../components/Loader";
import { GET_CONSTANTS_API, GET_DATA_API } from "../utils/api";

export const GamestateContext = createContext<{
  navigate: (des: string) => void;
  gameConstants: GameConstants;
  gameStates: GameStates;
  gameData: GameData;
  setGameState: (newState: any) => void;
  fetchData: any;
  gameImages: any;
  getMush: any;
  path: string;
  setIsTutorial: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  navigate: () => {},
  gameConstants: {} as GameConstants,
  gameStates: {
    loading: true,
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
  setGameState: () => {},
  gameData: {} as GameData,
  fetchData: () => {},
  gameImages: {},
  getMush: (): any => {},
  path: "/",
  setIsTutorial: () => {},
});

const GamestateProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTutorial, setIsTutorial] = useState(false);
  const [path, setPath] = useState("/");
  const pathRef = useRef("/");

  const [gameImages, setGameImages] = useState<any>({});
  const [gameData, setGameData] = useState<GameData>({} as GameData);
  const [imageLoading, setImageLoading] = useState(true);

  // Check loc ensures that player is redirected before rendering the rest of the page.
  const [checkLoc, setCheckLoc] = useState(false);

  const getMush = (num: number) => {
    const room = gameData.room;
    if (room.mushrooms[num] === undefined) {
      return room.mushrooms[0];
    }
    return room.mushrooms[num];
  };

  function redirect(des: string) {
    // if (loc.pathname === "/test") return;
    if (pathRef.current === des) {
      setCheckLoc(true);
      return;
    }
    pathRef.current = des;
    setPath(des);
    setCheckLoc(true);
  }

  const navigate = (d: string) => {
    pathRef.current = d;
    setPath(d);
  };

  let id = GetID();
  const fetchImages = async (room?: Room) => {
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
      "Shiitake",
    ];

    let imgs: any = {};

    for (const name of baseImage) {
      const raw = await fetch(img(name));
      const blob = await raw.blob();
      const url = URL.createObjectURL(blob);
      imgs[name] = url;
    }

    if (room === undefined) {
      setGameImages(() => ({
        ...imgs,
      }));

      setImageLoading(false);
      return;
    }

    const Mushrooms = Object.keys(room.mushrooms);

    for (const mush of Mushrooms) {
      const name = room.mushrooms[mush].name;
      const raw = await fetch(img(name));
      const blob = await raw.blob();
      const url = URL.createObjectURL(blob);
      imgs[name] = url;
    }

    setGameImages(() => ({
      ...imgs,
    }));

    setImageLoading(false);
  };

  // useQuery to fetch constants.
  const { data: constants, isLoading: constLoading } = useQuery({
    queryKey: ["constants"],
    initialData: { states: {} },
    queryFn: async () => {
      try {
        const res = await axios.get(GET_CONSTANTS_API);
        console.log(res);
        // After fetching constants, fetch room data
        fetchData(res.data.states);
        return res.data;
      } catch (err) {
        setGameState({ loading: false });
        console.log(err);
      }
      return { states: {}, mushrooms: {} };
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
    showHideLoc: [165, 100],
    onLeave: false,
    loading: true,
  });

  const setGameState = (newStates: any) => {
    setGameStates((prev: GameStates) => ({
      ...prev,
      ...newStates,
    }));
  };

  // Fetch API
  const fetchData = async (states: any, msg?: Message | undefined) => {
    id = GetID();
    if (id === "none") {
      setGameState({ loading: false });
      redirect("/");
      fetchImages();
      setGameData({} as GameData);
      return;
    }
    console.log("Fetching Data");
    try {
      // const res = await refetch();
      const res = await axios.get(GET_DATA_API(id));
      handleData(states, res, msg);
    } catch (err) {
      setGameState({ loading: false });
      // console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.data.Message === "Room does not exist") {
          console.log("room dont exist");
        }
        localStorage.clear();
        redirect("/");
      }
    }
  };

  // Handling data after fetched
  const handleData = (states: any, res: any, m?: Message | undefined) => {
    setGameState({ loading: false });

    // console.log("HANDLING");
    // console.log(m.current);
    // console.log(m);

    if (m !== undefined) {
      console.log(m);
    }

    let [room, player, State] = [res.data.room, res.data.player, states];

    console.log(room);
    console.log(player);
    if (Object.keys(gameImages).length === 0) {
      fetchImages(room);
    }

    setGameData((prevState: GameData) => ({
      ...prevState,
      player: res.data.player,
      room: res.data.room,
    }));

    // populate hand
    setGameState({ hand: player.hand });

    // Reset player choice
    if (player.play !== -1) {
      setGameState({
        selected: player.play,
        hand: player.hand.filter((num: number) => num !== player.play),
      });
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

    if (room.state === State.CALCULATING) {
      setGameState({ showPlaying: true });
      redirect("/game");
    }

    if (room.state === State.PROCESS || room.state === State.ROUND_END) {
      setGameState({ handToggle: false, showPlaying: true });
    }

    if (room.state === State.CHOOSE_ROW) {
      setGameState({ currentDeck: room.deck, bottomDisp: "blank" });
      redirect("/game");
    }

    if (room.state === State.CHOOSE_CARD) {
      setGameState({ currentDeck: room.deck });
      redirect("/game");
    }

    // Handle update based on websocket messages ========================
    // Ready messages
    if (m !== undefined) {
      if (m.state == State.REGISTERED) {
        setGameState({ isAlready: false });
      }

      if (
        m.state == State.ALREADY ||
        m.state == State.UNREADY ||
        m.state == State.READY
      ) {
        if (m.state == State.ALREADY) {
          setGameState({ isAlready: true });
        }
        if (m.state == State.UNREADY) {
          setGameState({ isAlready: false });
        }
      }

      // Start game!
      if (m.state == State.START) {
        setGameState({ isAlready: false, showPlaying: false });
      }

      // Show playing (During process)
      if (
        m.state == State.PROCESS ||
        m.state == State.ROUND_END ||
        m.state == State.GAME_END
      ) {
        setGameState({ showPlaying: true, selected: -1 });
      }

      // Handle row choosing
      if (m.state == State.CHOOSE_ROW) {
        setGameState({ handToggle: false, bottomDisp: "blank" });
        // Hide hands
      }

      // Show playing
      if (m.state == State.ROW_SELECTED) {
        setGameState({ showPlaying: true, selected: -1 });
      }
    }
  };

  // Show Loaders
  if (gameStates.loading) {
    console.log("General loading");
    return <Loader />;
  }
  if (path !== "/" && !isTutorial) {
    // Constant loading
    if (constLoading) {
      // console.log("Loading constants");
      return <Loader />;
    }

    // Game data loading
    if (gameData.player === undefined && path !== "/test") {
      // console.log("Loading data");
      return <Loader />;
    }

    if (
      imageLoading
      // location.pathname !== "/test"
    ) {
      // console.log("Loading images");
      return <Loader />;
    }

    if (!checkLoc) return <Loader />;
  }

  // return <Loader />;

  return (
    <GamestateContext.Provider
      value={{
        navigate: navigate,
        gameConstants: {
          State: constants.states,
        },
        gameStates: gameStates,
        setGameState: setGameState,
        gameData: gameData,
        fetchData: fetchData,
        gameImages: gameImages,
        getMush: getMush,
        path: path,
        setIsTutorial: setIsTutorial,
      }}
    >
      {children}
    </GamestateContext.Provider>
  );
};

export default GamestateProvider;
