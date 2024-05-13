import React, { useContext } from "react";
import * as utils from "../utils/utils";
import { GamestateContext } from "../modules/gamestate_provider";

interface props {
  winner: string;
}

const Winner = ({ winner }: props) => {
  return <div>Winner is {winner} </div>;
};

export default Winner;
