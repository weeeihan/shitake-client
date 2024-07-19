import React, { useState, createContext } from "react";
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
  setGameStates: React.Dispatch<React.SetStateAction<GameStates>>;
  fetchData: any;
  gameImages: any;
  getMush: any;
  path: string;
}>({
  navigate: () => {},
  gameConstants: {} as GameConstants,
  gameStates: {
    loading: false,
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
  getMush: (): any => {},
  path: "/",
});

const GamestateProvider = ({ children }: { children: React.ReactNode }) => {
  // const testPlayer: Player = {
  //   ...({} as Player),
  //   id: "12345",
  //   name: "player1",
  //   hp: 73,
  //   hand: [6, 8, 9, 10, 45],
  //   ready: false,
  //   play: -1,
  //   damageReport: {
  //     mushrooms: 90,
  //     damageTaken: 27,
  //     roundMushrooms: 3,
  //     roundDamage: 5,
  //     mushroomTypes: [1, 2, 3, 4],
  //   },
  // };

  // const testRoom: Room = {
  //   ...({} as Room),
  //   mushrooms: {
  //     0: {
  //       name: "Shiitake",
  //       damage: 1,
  //       desc: "something special",
  //       color: "brown",
  //     },
  //   },
  //   played: "",
  //   chooser: "",
  //   id: "8888",
  //   deck: [[1], [2], [3], [4]],
  //   players: [
  //     {
  //       name: "player1",
  //       hp: 0,
  //       ready: false,
  //     },
  //     {
  //       name: "player2",
  //       hp: 67,
  //       ready: true,
  //     },
  //     {
  //       name: "player3",
  //       hp: 89,
  //       ready: false,
  //     },
  //     {
  //       name: "player4",
  //       hp: 30,
  //       ready: false,
  //     },
  //     {
  //       name: "player5",
  //       hp: 67,
  //       ready: true,
  //     },
  //     {
  //       name: "leiloumou",
  //       hp: 89,
  //       ready: false,
  //     },
  //     {
  //       name: "player7",
  //       hp: 80,
  //       ready: false,
  //     },
  //     {
  //       name: "player8",
  //       hp: 67,
  //       ready: true,
  //     },
  //     {
  //       name: "player9",
  //       hp: 89,
  //       ready: false,
  //     },
  //     {
  //       name: "player10",
  //       hp: 100,
  //       ready: false,
  //     },
  //   ],
  // };

  const [path, setPath] = useState("/");

  // const navigate = useNavigate();
  const navigate = (des: string) => {
    setPath(des);
  };
  // const location = useLocation();
  const [gameImages, setGameImages] = useState<any>({});
  const [gameData, setGameData] = useState<GameData>({} as GameData);
  const [imageLoading, setImageLoading] = useState(true);

  // Check loc ensures that player is redirected before rendering the rest of the page.
  const [checkLoc, setCheckLoc] = useState(false);

  const getMush = (num: number) => {
    const room = gameData.room;
    // const room = testRoom;
    if (room.mushrooms[num] === undefined) {
      return room.mushrooms[0];
    }
    return room.mushrooms[num];
  };

  function redirect(des: string) {
    // if (loc.pathname === "/test") return;
    if (path === des) {
      setCheckLoc(true);
      return;
    }
    console.log("REDIRECTED");
    navigate(des);
    setCheckLoc(true);
  }

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
    loading: false,
  });

  // Fetch API
  const fetchData = async (states: any, msg?: Message | undefined) => {
    id = GetID();
    if (id === "none") {
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
    setGameStates((prev: GameStates) => ({
      ...prev,
      loading: false,
    }));
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

  if (gameStates.loading) {
    // console.log("General loading");
    return <Loader />;
  }

  // Constant loading
  if (constLoading) {
    // console.log("Loading constants");
    return <Loader />;
  }

  // Game data loading
  if (
    gameData.player === undefined &&
    location.pathname !== "/" &&
    location.pathname !== "/test"
  ) {
    // console.log("Loading data");
    return <Loader />;
  }

  if (
    imageLoading &&
    location.pathname !== "/"
    // location.pathname !== "/test"
  ) {
    // console.log("Loading images");
    return <Loader />;
  }

  if (!checkLoc) return <Loader />;

  // return <Loader />;

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
        path: path,
      }}
    >
      {children}
    </GamestateContext.Provider>
  );
};

export default GamestateProvider;
