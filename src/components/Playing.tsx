import React, { useContext } from "react";
import * as images from "../assets/images/images";
import useStore from "../utils/store";
import { Played } from "../utils/struct";

import { GamestateContext } from "../modules/gamestate_provider";

const Playing = () => {
  const { roomData } = useContext(GamestateContext);

  return (
    <>
      {roomData.played != null &&
        Object.keys(roomData.played).map((key, index) => (
          <div key={index}>
            {key} : {roomData.played[key]}
          </div>
        ))}
    </>
  );
};

export default Playing;
