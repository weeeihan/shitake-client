// Dependencies
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Functions
import * as utils from "../utils/utils";
import * as handlers from "../utils/handlers";

// UI Components
import LandingCanvas from "../components/LandingCanvas";

// Context
import { GamestateContext } from "../modules/gamestate_provider";
import { WebsocketContext } from "../modules/websocket_provider";

const Landing = () => {
  const { Mushrooms } = useContext(GamestateContext);
  const debug = () => {
    console.log(Mushrooms);
  };
  return (
    <>
      <LandingCanvas />
      <button onClick={debug}>Debug</button>
    </>
  );
};

export default Landing;
