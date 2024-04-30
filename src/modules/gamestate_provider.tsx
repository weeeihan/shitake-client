import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { GET_STATES_API } from "../utils/api";
import { resOk } from "../utils/utils";
import { GetID } from "../utils/utils";
import { Player, Room } from "../utils/struct";
import * as handlers from "../utils/handlers";

export const GamestateContext = createContext<{
  playerStatus: string;
  setPlayerStatus: React.Dispatch<React.SetStateAction<string>>;
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  roomData: Room;
  setRoomData: React.Dispatch<React.SetStateAction<Room>>;
  State: any;
  isAlready: boolean;
  setIsAlready: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  playerStatus: "",
  setPlayerStatus: () => {},
  player: {} as Player,
  setPlayer: () => {},
  roomData: {} as Room,
  setRoomData: () => {},
  State: null,

  isAlready: false,
  setIsAlready: () => {},
});

const GamestateProvider = ({ children }: { children: React.ReactNode }) => {
  const [gamestate, setGamestate] = useState<any>(null);
  const [isAlready, setIsAlready] = useState<boolean>(false);
  const [playerStatus, setPlayerStatus] = useState<string>("");

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

  const id = GetID();

  useEffect(() => {
    // GET THE STATES ENUM
    async function getGamestate() {
      const res = await axios.get(GET_STATES_API);
      if (resOk(res)) {
        setGamestate(res.data);
      }
    }

    getGamestate();
    if (id !== "none") {
      // check Player
      handlers.GetPlayer(id, setPlayerStatus, setPlayer);
      handlers.GetRoom(id, setPlayerStatus, setRoomData);
    }
    if (id === "none") {
      setPlayerStatus("Fail");
    }
  }, []);

  return (
    <GamestateContext.Provider
      value={{
        State: gamestate,
        playerStatus: playerStatus,
        setPlayerStatus: setPlayerStatus,
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
