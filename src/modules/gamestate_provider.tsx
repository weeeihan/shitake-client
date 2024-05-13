import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { GET_STATES_API } from "../utils/api";
import { resOk } from "../utils/utils";
import { GetID } from "../utils/utils";
import { Player, Room } from "../utils/struct";
import * as handlers from "../utils/handlers";
import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";

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
  navigate: NavigateFunction;
  bottomDisp: string;
  setBottomDisp: React.Dispatch<React.SetStateAction<string>>;
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
    chooser: "",
    played: null,
  });

  function getData(id: string) {
    handlers.GetPlayer(id, setPlayer);
    handlers.GetRoom(id, setRoomData);
  }

  function redirect(loc: string, des: string) {
    return loc !== des && navigate(des);
  }

  useEffect(() => {
    handlers.GetGamestate(setGamestate);
  }, []);

  useEffect(() => {
    if (gamestate !== null || player.id === "" || roomData.id === "") {
      const id = GetID();

      // GET THE STATES ENUM
      if (id !== "none") {
        // console.log("Checking player...");
        // check Player
        getData(id);
      }

      if (id === "none") {
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    }
  }, [gamestate]);

  useEffect(() => {
    if (gamestate !== null && roomData.id !== "") {
      if (roomData.id == "ERROR") {
        navigate("/");
      }

      if (roomData.id !== "" && gamestate !== null) {
        switch (roomData.state) {
          case gamestate.INIT:
            redirect(location.pathname, "/lobby");
            break;

          case gamestate.CHOOSE_CARD:
            redirect(location.pathname, "/game");
            break;

          case gamestate.CHOOOSE_ROW:
            redirect(location.pathname, "/game");
            break;

          case gamestate.ROUND_END:
            redirect(location.pathname, "/roundend");
            break;
        }
      }
      //handle redirection
    }
  }, [roomData]);

  useEffect(() => {
    const id = GetID();
    if (id !== "none") {
      getData(id);
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
