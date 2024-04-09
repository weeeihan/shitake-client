import * as handlers from "../handlers/handlers";
import * as utils from "../utils/utils";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Landing from "@/components/landing";

const index = () => {
  // const [joinCreate, setJoinCreate] = useState<string>("Create Room");
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const router = useRouter();

  const id: string = utils.GetID();
  const joinCreate: string = roomID === "" ? "Create Room" : "Join Room";

  useEffect(() => {
    if (id !== "") {
      handlers.CheckRoom(id, router);
    }
  }, []);

  const joinRoomHandler = async (e: React.SyntheticEvent) => {
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

    handlers.JoinRoom(name, roomID, router);
  };

  const createRoomHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name === "") {
      alert("PLEASE FILL IN YOUR NAME");
      return;
    }
    if (utils.hasWhiteSpace(name)) {
      alert("NO WHITESPACE ALLOWED IN NAME");
      return;
    }
    handlers.CreateRoom(name, router);
  };

  const debug = (e: React.SyntheticEvent) => {
    console.log(localStorage.getItem("id"));
    // localStorage.clear();
  };

  const clearLocal = (e: React.SyntheticEvent) => {
    localStorage.clear();
  };

  return (
    <>
      <Landing
        name={name}
        roomID={roomID}
        setName={setName}
        setRoomID={setRoomID}
        joinCreate={joinCreate}
        joinRoomHandler={joinRoomHandler}
        createRoomHandler={createRoomHandler}
      />
      <button onClick={debug}>debug</button>
    </>

    // Debug mode
    // <div className="flex items-center justify-center h-screen">
    //   <Card className="w-full max-w-3xl">
    //     <CardHeader>
    //       <CardTitle className="text-2xl">SHITAKE</CardTitle>
    //       <CardContent className="prose max-w-none">
    //         <p>Enter your name and the room code to join the game.</p>
    //       </CardContent>
    //     </CardHeader>
    //     <CardContent className="grid gap-4">
    //       <div className="space-y-2">
    //         <Label htmlFor="name">Name</Label>
    //         <Input
    //           id="name"
    //           placeholder="Give a name!"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //           autoComplete="off"
    //         />
    //       </div>
    //       <div className="space-y-2">
    //         <Label htmlFor="room-code">Room code</Label>
    //         <Input
    //           id="room-code"
    //           placeholder="Enter the room code"
    //           value={roomID}
    //           onChange={(e) => setRoomID(e.target.value)}
    //         />
    //       </div>
    //       {roomID == "" ? (
    //         <Button onClick={createRoomHandler}>Create Room</Button>
    //       ) : (
    //         <Button onClick={joinRoomHandler}>Join Room</Button>
    //       )}

    //       <Button onClick={debug}>DEBUG</Button>
    //       <Button onClick={clearLocal}>Clear Localstorage</Button>
    //     </CardContent>
    //   </Card>
    // </div>
  );
};

export default index;
