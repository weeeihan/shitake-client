import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { GET_STATES_API } from "../utils/api";
import { resOk } from "../utils/utils";
import { GetID } from "../utils/utils";

export const GamestateContext = createContext<{
  id: string;
  State: any;
  setId: (id: string) => void;
}>({
  id: "",
  State: null,
  setId: () => {},
});

const GamestateProvider = ({ children }: { children: React.ReactNode }) => {
  const [gamestate, setGamestate] = useState<any>(null);
  const [id, setId] = useState<string>("");
  useEffect(() => {
    if (gamestate == null) {
      getGamestate();
    }
    setId(GetID());
    async function getGamestate() {
      const res = await axios.get(GET_STATES_API);
      if (resOk(res)) {
        setGamestate(res.data);
      }
    }
  }, []);
  return (
    <GamestateContext.Provider
      value={{
        id: id,
        State: gamestate,
        setId: setId,
      }}
    >
      {children}
    </GamestateContext.Provider>
  );
};

export default GamestateProvider;
