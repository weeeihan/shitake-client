import React from "react";
import * as images from "../assets/images/images";

type Props = {
  name: string;
  roomID: string;
  setName: (name: string) => void;
  setRoomID: (roomID: string) => void;
  joinCreate: string;
  handleJoinRoom: (e: React.SyntheticEvent) => void;
  handleCreateRoom: (e: React.SyntheticEvent) => void;
};

const LandingCanvas = ({
  name,
  roomID,
  setName,
  setRoomID,
  joinCreate,
  handleJoinRoom,
  handleCreateRoom,
}: Props) => {
  const clearLocal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    localStorage.clear();
  };

  const debug = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(localStorage.getItem("id"));
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
      <button
        className="font-klee bg-black text-white mt-10 rounded-lg py-2 px-2 drop-shadow-md"
        onClick={(e) => {
          joinCreate == "Join Room" ? handleJoinRoom(e) : handleCreateRoom(e);
        }}
      >
        {joinCreate}
      </button>
      <button
        className="font-klee bg-black text-white mt-10 rounded-lg py-2 px-2 drop-shadow-md"
        onClick={clearLocal}
      >
        clear local
      </button>
      <button
        className="font-klee bg-black text-white mt-10 rounded-lg py-2 px-2 drop-shadow-md"
        onClick={debug}
      >
        debug
      </button>
    </div>
  );
};

export default LandingCanvas;
