import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { GET_STATES_API } from "../utils/api";
import { resOk } from "../utils/utils";
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
  isAlready: boolean;
  setIsAlready: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
  bottomDisp: string;
  setBottomDisp: React.Dispatch<React.SetStateAction<string>>;
}>({
  player: {} as Player,
  setPlayer: () => {},
  roomData: {} as Room,
  setRoomData: () => {},
  State: null,
  isAlready: false,
  setIsAlready: () => {},
  navigate: () => {},
  bottomDisp: "Hand",
  setBottomDisp: () => {},
});

const GamestateProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bottomDisp, setBottomDisp] = useState<string>("Hand");
  const [gamestate, setGamestate] = useState<any>(null);
  const [isAlready, setIsAlready] = useState<boolean>(false);

  const [player, setPlayer] = useState<Player>({
    id: "",
    name: "",
    score: 0,
    hand: [],
    ready: false,
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
    return location.pathname !== des && navigate(des);
  }

  useEffect(() => {
    if (gamestate === null) {
      handlers.GetGamestate(setGamestate);
    }
  }, []);

  useEffect(() => {
    if (id == "none") {
      redirect("/");
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

  // useEffect(() => {
  //   const id = GetID();
  //   if (id !== "none") {
  //     getData(id);
  //   }
  // }, [location]);

  if (gamestate === null) {
    return <div>Loading gamestate...</div>;
  }

  if (location.pathname !== "/" && (player.id === "" || roomData.id === "")) {
    return <div>Loading data...</div>;
  }

  return (
    <GamestateContext.Provider
      value={{
        State: gamestate,
        player: player,
        setPlayer: setPlayer,
        roomData: roomData,
        setRoomData: setRoomData,
        isAlready: isAlready,
        setIsAlready: setIsAlready,
        navigate: navigate,
        bottomDisp,
        setBottomDisp,
      }}
    >
      {children}
    </GamestateContext.Provider>
  );
};

export default GamestateProvider;
