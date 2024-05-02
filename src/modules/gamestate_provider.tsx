import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { GET_STATES_API } from "../utils/api";
import { resOk } from "../utils/utils";
import { GetID } from "../utils/utils";
import { Player, Room } from "../utils/struct";
import * as handlers from "../utils/handlers";
import { useNavigate, useLocation } from "react-router-dom";

export const GamestateContext = createContext<{
  loc: string;
  setLoc: React.Dispatch<React.SetStateAction<string>>;
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  roomData: Room;
  setRoomData: React.Dispatch<React.SetStateAction<Room>>;
  State: any;
  isAlready: boolean;
  setIsAlready: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  loc: "",
  setLoc: () => {},
  player: {} as Player,
  setPlayer: () => {},
  roomData: {} as Room,
  setRoomData: () => {},
  State: null,

  isAlready: false,
  setIsAlready: () => {},
});

const GamestateProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [gamestate, setGamestate] = useState<any>(null);
  const [isAlready, setIsAlready] = useState<boolean>(false);
  const [loc, setLoc] = useState<string>("");

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
  });

  function getData(id: string) {
    handlers.GetPlayer(id, setPlayer, location.pathname, navigate);
    handlers.GetRoom(id, setRoomData, location.pathname, navigate);
  }

  useEffect(() => {
    handlers.GetGamestate(setGamestate);
  }, []);

  useEffect(() => {
    const id = GetID();
    // GET THE STATES ENUM

    if (id !== "none") {
      console.log("Checking player...");
      // check Player
      getData(id);
    }

    if (id === "none") {
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [location]);

  return (
    <GamestateContext.Provider
      value={{
        State: gamestate,
        loc: loc,
        setLoc: setLoc,
        player: player,
        setPlayer: setPlayer,
        roomData: roomData,
        setRoomData: setRoomData,
        isAlready: isAlready,
        setIsAlready: setIsAlready,
      }}
    >
      {children}
    </GamestateContext.Provider>
  );
};

export default GamestateProvider;
