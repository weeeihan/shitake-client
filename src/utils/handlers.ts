import axios from "axios"; 
import {  NavigateFunction } from "react-router-dom";
import { CHECK_PLAYER_API, CONNECT_API, CREATE_ROOM_API, GET_PLAYER_API, GET_ROOM_API, JOIN_ROOM_API, LEAVE_ROOM_API } from "./api";
import { resOk } from "./utils";
import React from "react";
import { Room, Player } from "./struct";

export async function CheckPlayer(playerID: string, navigate: NavigateFunction, location: string, setIsPlayer?: React.Dispatch<React.SetStateAction<boolean>>){
  try {
    const res = await axios.get(CHECK_PLAYER_API(playerID))
    if (resOk(res)) {
      if (location == "/") {
        navigate("/lobby")
        return
      }
      if (setIsPlayer !== undefined) {
        setIsPlayer(true)
      }

    }
  } catch (error) {
    if (location !== "/") {
      navigate("/")
    }
    localStorage.clear()
  }
}
export async function GetRoom(playerID: string, navigate: NavigateFunction, location: string, setRoom:React.Dispatch<React.SetStateAction<Room>>, State: any) {
  try {
    const roomID = playerID.slice(-4);
    const res = await axios.get(GET_ROOM_API(roomID));
    if (resOk(res)) {
      if (location == "/lobby" && res.data.state !== State.INIT) {
        navigate("/game")
        return
      }
      if (location == "/game" && res.data.state == State.INIT) {
        navigate("/lobby")
        return
      }

      return setRoom(res.data)
    }

    localStorage.clear();
  } catch (error) {
    navigate("/")
    localStorage.clear()
    console.log(error);
  }
  
}
export async function JoinRoom(name: string, roomID: string, navigate: NavigateFunction, setId: (id: string) => void) {
  try {
    const res = await axios.get(JOIN_ROOM_API(name, roomID))
    if (resOk(res)) {
      const playerID = res.data.PlayerID
      localStorage.setItem("id",playerID)
      setId(playerID)
      navigate("/lobby")
    }
  } catch (error: any) {
    alert(error.response.data.Message)
  }
}
export async function CreateRoom(name: string, navigate: NavigateFunction, setId: (id: string) => void){

  try {
    const res = await axios.get(CREATE_ROOM_API(name))
    if (resOk(res)) {

      const playerID = res.data.playerID
      localStorage.setItem("id",res.data.playerID)
      setId(playerID)
      navigate("/lobby")

    }
  } catch (error) {
    console.log(error)
  }
}

export async function ConnectToGame(id: string, setConn: (conn: WebSocket)=> void) {
  const ws = new WebSocket(CONNECT_API(id))
  if (ws.OPEN) {
    setConn(ws)
    return
  }
}

export async function GetPlayer(id: string, setPlayer: React.Dispatch<React.SetStateAction<Player>>) {
  try {
    const res = await axios.get(GET_PLAYER_API(id))
    if (resOk(res)) {
      setPlayer(res.data)

    }
  } catch (error) {
    console.log(error)
  }
}

export async function LeaveRoom(id: string, navigate: NavigateFunction) {
  try {
    const res = await axios.get(LEAVE_ROOM_API(id))
    if (resOk(res)) {
      localStorage.clear()
      navigate("/")
    } 
  } catch (error) {
    console.log(error)
  }
}