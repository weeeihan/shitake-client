import { useContext } from "react";
import { GamestateContext } from "../modules/gamestate_provider";
import { DamageReport, Player, PlayerDisplay } from "../utils/struct";
import Mushcard from "../components/Mushcard";
import { WebsocketContext } from "../modules/websocket_provider";
import { actions, getResults } from "../utils/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as handlers from "../utils/handlers";

const Test = () => {
  const { gameConstants } = useContext(GamestateContext);
  const debug = () => {
    console.log(gameConstants);
  };

  return (
    <div>
      <button onClick={debug}>debug</button>
    </div>
  );
};

export default Test;
