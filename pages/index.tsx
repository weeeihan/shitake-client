import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Player } from "@/structs/structs";
import * as handlers from "../handlers/handlers";
import * as utils from "../utils/utils";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const index = () => {
  const [player, setPlayer] = useState<Player>({
    id: "",
    name: "",
    roomID: "",
  });
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const router = useRouter();

  useEffect(() => {
    setPlayer(utils.GetPlayer());
  }, []);

  useEffect(() => {
    if (player !== null) {
      if (player.id !== "") {
        router.push("/lobby");
      }
    }
  }, [player]);

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
    console.log(localStorage.getItem("Player"));
    // localStorage.clear();
  };

  const clearLocal = (e: React.SyntheticEvent) => {
    localStorage.clear();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">SHITAKE</CardTitle>
          <CardContent className="prose max-w-none">
            <p>Enter your name and the room code to join the game.</p>
          </CardContent>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Give a name!"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="room-code">Room code</Label>
            <Input
              id="room-code"
              placeholder="Enter the room code"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
            />
          </div>
          {roomID == "" ? (
            <Button onClick={createRoomHandler}>Create Room</Button>
          ) : (
            <Button onClick={joinRoomHandler}>Join Room</Button>
          )}

          <Button onClick={debug}>DEBUG</Button>
          <Button onClick={clearLocal}>Clear Localstorage</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default index;
