// Dependencies
import React, { useContext, useState } from "react";
import * as images from "../assets/images/images";

// Functions
import * as utils from "../utils/utils";
import * as handlers from "../utils/handlers";

// UI Components

// Context
import { GamestateContext } from "../modules/gamestate_provider";

const Landing = () => {
  const {
    gameConstants: { State },
    fetchData,
  } = useContext(GamestateContext);
  const debug = () => {
    // console.log(utils.GetID());
    // localStorage.setItem("id", "1234");
    // refetchPlayer();
  };
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const joinCreate: string = roomID === "" ? "Create Room" : "Join Room";

  const handleJoinRoom = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name === "") {
      alert("PLEASE FILL IN YOUR NAME");
      return;
    }

    // if (utils.hasWhiteSpace(name)) {
    //   alert("NO WHITESPACE ALLOWED IN NAME");
    //   return;
    // }

    if (roomID === "") {
      alert("PLEASE FILL IN THE ROOM CODE");
      return;
    }

    handlers.JoinRoom(name, State, roomID, fetchData);
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

    handlers.CreateRoom(name, State, fetchData);
  };

  const clearLocal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    localStorage.clear();
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <img className="drop-shadow-lg" alt="Mush1" src={images.mush1} />
      </div>
      <div className="text-7xl font-rubik">SHITAKE</div>
      <div className="text-2xl font-reenie">A number game by Han.</div>
      <div className="pt-20">Name</div>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="outline border mt-2 w-60 py-0.5 rounded-md text-center drop-shadow-lg text-gray-700 leading-tight"
      />
      <div className="pt-3 font-klee">Room code</div>
      <input
        onChange={(e) => setRoomID(e.target.value)}
        value={roomID}
        className="outline border mt-2 w-60 py-0.5 rounded-md text-center drop-shadow-lg text-gray-700 leading-tight"
      />
      {name === "" ? (
        <div>
          <button className="font-klee text-white mt-10 rounded-lg py-2 px-2 drop-shadow-md">
            Empty
          </button>
        </div>
      ) : (
        <div>
          <button
            className="font-klee bg-black text-white mt-10 rounded-lg py-2 px-2 drop-shadow-md"
            onClick={(e) => {
              joinCreate == "Join Room"
                ? handleJoinRoom(e)
                : handleCreateRoom(e);
            }}
          >
            {joinCreate}
          </button>
        </div>
      )}
      {/* <button
        className="font-klee bg-black text-white mt-10 rounded-lg py-2 px-2 drop-shadow-md"
        onClick={debug}
      >
        debug
      </button>

      <button
        className="font-klee bg-black text-white mt-10 rounded-lg py-2 px-2 drop-shadow-md"
        onClick={debug}
      >
        debug
      </button> */}
    </div>
  );
};

export default Landing;
