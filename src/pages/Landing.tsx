// Dependencies
import React, { useContext, useState } from "react";

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
    setGameStates,
    navigate,
    setIsTutorial,
  } = useContext(GamestateContext);
  // const debug = () => {
  //   console.log(utils.GetID());
  //   // localStorage.setItem("id", "1234");
  //   // refetchPlayer();
  // };
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const joinCreate: string = roomID === "" ? "Create Room" : "Join Room";

  const setLoading = () => {
    setGameStates((prev) => ({
      ...prev,
      loading: true,
    }));
  };

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

    if (roomID.length !== 4) {
      alert("ROOM ID MUST BE 4 NUMBERS");
      return;
    }

    for (let i = 0; i < roomID.length; i++) {
      if (isNaN(parseInt(roomID[i]))) {
        alert("ROOM ID MUST BE 4 NUMBERS");
        return;
      }
    }

    setLoading();
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

    setLoading();
    // Set loading true

    handlers.CreateRoom(name, State, fetchData);
  };

  // const clearLocal = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   localStorage.clear();
  // };

  // console.log(gameImages.Shiitake);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div>
          <img
            className="drop-shadow-lg"
            alt="Mush1"
            width={150}
            src={utils.img("Shiitake")}
          />
        </div>
        <div className="text-7xl font-rubik">SHITAKE</div>
        <div className="text-2xl font-reenie">A number game.</div>
        <div className="pt-20">Name</div>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className=" border border-black mt-2 w-60 py-0.5 rounded-md text-center drop-shadow-lg text-gray-700 leading-tight"
        />
        <div className="pt-3 font-klee">Room code</div>
        <input
          onChange={(e) => setRoomID(e.target.value)}
          value={roomID}
          className=" border border-black mt-2 w-60 py-0.5 rounded-md text-center drop-shadow-lg text-gray-700 leading-tight"
        />
        {name === "" ? (
          <div>
            <button className="font-klee text-white mt-10 rounded-lg py-2 px-2 ">
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
        <button
          className="text-blue-800 underline"
          onClick={() => {
            setIsTutorial(true);
            navigate("/tutorial");
          }}
        >
          How to play?
        </button>

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
    </div>
  );
};

export default Landing;
