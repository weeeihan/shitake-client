// Dependencies
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Functions
import * as utils from "../utils/utils";
import * as handlers from "../utils/handlers";

// UI Components
import LandingCanvas from "../components/LandingCanvas";

// Context
import { GamestateContext } from "../modules/gamestate_provider";

const Landing = () => {
  const { id, setId, State } = useContext(GamestateContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const joinCreate: string = roomID === "" ? "Create Room" : "Join Room";

  useEffect(() => {
    if (id !== "") {
      if (id !== "none") {
        handlers.CheckPlayer(id, navigate, "/");
      }
    }
  }, [id]);

  const handleJoinRoom = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name === "") {
      alert("PLEASE FILL IN YOUR NAME");
      return;
    }

    if (utils.hasWhiteSpace(name)) {
      alert("NO WHITESPACE ALLOWED IN NAME");
      return;
    }

    if (roomID === "") {
      alert("PLEASE FILL IN THE ROOM CODE");
      return;
    }

    handlers.JoinRoom(name, roomID, navigate, setId);
  };

  const handleCreateRoom = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name === "") {
      alert("PLEASE FILL IN YOUR NAME");
      return;
    }

    if (utils.hasWhiteSpace(name)) {
      alert("NO WHITESPACE ALLOWED IN NAME");
      return;
    }

    handlers.CreateRoom(name, navigate, setId);
  };

  const debug = () => {
    console.log(State);
  };
  return (
    <>
      <LandingCanvas
        name={name}
        roomID={roomID}
        setName={setName}
        setRoomID={setRoomID}
        joinCreate={joinCreate}
        handleJoinRoom={handleJoinRoom}
        handleCreateRoom={handleCreateRoom}
      />
      <button onClick={debug}>debug</button>
    </>
  );
};

export default Landing;
