// Dependencies
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Functions
import * as utils from "../utils/utils";
import * as handlers from "../utils/handlers";

// UI Components
import LandingCanvas from "../components/LandingCanvas";

const Landing = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const id: string = utils.GetID();
  const joinCreate: string = roomID === "" ? "Create Room" : "Join Room";

  useEffect(() => {
    if (id !== "") {
      handlers.GetRoom(id, navigate, "/");
    }
  }, []);

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

    handlers.JoinRoom(name, roomID, navigate);
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

    handlers.CreateRoom(name, navigate);
  };

  return (
    <LandingCanvas
      name={name}
      roomID={roomID}
      setName={setName}
      setRoomID={setRoomID}
      joinCreate={joinCreate}
      handleJoinRoom={handleJoinRoom}
      handleCreateRoom={handleCreateRoom}
    />
  );
};

export default Landing;
