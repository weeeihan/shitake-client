import React, { useState, createContext, useEffect } from "react";
import { GetID } from "../utils/utils";
import { Player, Room } from "../utils/struct";
import * as handlers from "../utils/handlers";
import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";

export const GamestateContext = createContext<{
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  roomData: Room;
  setRoomData: React.Dispatch<React.SetStateAction<Room>>;
  State: any;
  Mushrooms: any;
  isAlready: boolean;
  setIsAlready: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
  bottomDisp: string;
  setBottomDisp: React.Dispatch<React.SetStateAction<string>>;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  hand: number[];
  setHand: React.Dispatch<React.SetStateAction<number[]>>;
}>({
  player: {} as Player,
  setPlayer: () => {},
  roomData: {} as Room,
  setRoomData: () => {},
  State: null,
  Mushrooms: null,
  isAlready: false,
  setIsAlready: () => {},
  navigate: () => {},
  bottomDisp: "Dasboard",
  setBottomDisp: () => {},
  selected: -1,
  setSelected: () => {},
  hand: [],
  setHand: () => {},
});

const GamestateProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState<number>(-1);
  const [hand, setHand] = useState<number[]>([]);

  const [bottomDisp, setBottomDisp] = useState<string>("Dashboard");
  const [gamestate, setGamestate] = useState<any>(null);
  const [mushrooms, setMushrooms] = useState<any>(null);
  const [isAlready, setIsAlready] = useState<boolean>(false);

  const [player, setPlayer] = useState<Player>({
    id: "",
    name: "",
    hp: 0,
    hand: [],
    ready: false,
    play: 0,
  });

  const [roomData, setRoomData] = useState<Room>({
    id: "",
    state: "",
    players: [],
    deck: [],
    chooser: "",
    played: null,
  });

  const id = GetID();

  function getData(id: string) {
    handlers.GetPlayer(id, setPlayer);
    handlers.GetRoom(id, setRoomData);
  }

  function redirect(des: string) {
    if (location.pathname === des) return;
    navigate(des);
  }

  useEffect(() => {
    // console.log("GAMESTATE-RENDER");
    handlers.GetGamestate(setGamestate);
    handlers.GetMushrooms(setMushrooms);
  }, []);

  useEffect(() => {
    if (id == "none") {
      redirect("/");
      setBottomDisp("Dashboard");
      return () => {};
    }

    if (gamestate !== null) {
      getData(id);
    }
  }, [gamestate, location]);

  // REDIRECT!
  useEffect(() => {
    if (roomData.id !== "") {
      if (roomData.id == "ERROR") {
        navigate("/");
        return () => {};
      }

      switch (roomData.state) {
        case gamestate.INIT:
          redirect("/lobby");
          break;

        case gamestate.CHOOSE_CARD:
          redirect("/game");
          break;

        case gamestate.CHOOOSE_ROW:
          redirect("/game");
          break;

        case gamestate.ROUND_END:
          redirect("/roundend");
          break;
      }
    }
  }, [roomData]);

  useEffect(() => {
    if (player.id !== "") {
      setHand(player.hand);
      if (player.play !== -1) {
        setSelected(player.play);
        setHand((hand) => hand.filter((num) => num !== player.play));
      }
    }
  }, [player]);

  // useEffect(() => {
  //   const id = GetID();
  //   if (id !== "none") {
  //     getData(id);
  //   }
  // }, [location]);)

  if (gamestate === null || mushrooms === null) {
    return <div>Loading gamestates...</div>;
  }

  if (location.pathname !== "/" && (player.id === "" || roomData.id === "")) {
    return <div>Loading data...</div>;
  }

  return (
    <GamestateContext.Provider
      value={{
        Mushrooms: mushrooms,
        State: gamestate,
        player: player,
        setPlayer: setPlayer,
        roomData: roomData,
        setRoomData: setRoomData,
        isAlready: isAlready,
        setIsAlready: setIsAlready,
        navigate: navigate,
        bottomDisp: bottomDisp,
        setBottomDisp: setBottomDisp,
        selected: selected,
        setSelected: setSelected,
        hand: hand,
        setHand: setHand,
      }}
    >
      {children}
    </GamestateContext.Provider>
  );
};

export default GamestateProvider;
