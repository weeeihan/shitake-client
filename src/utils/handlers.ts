import axios from "axios"; 
import {  NavigateFunction } from "react-router-dom";
import { CONNECT_API, CREATE_ROOM_API, GET_PLAYER_API, GET_ROOM_API, JOIN_ROOM_API, LEAVE_ROOM_API } from "./api";
import { resOk } from "./utils";
import React from "react";
import { Room, Player } from "./struct";



export async function GetRoom(playerID: string, navigate: NavigateFunction, pathname: string, setRoom?:React.Dispatch<React.SetStateAction<Room>>) {
  try {
    const roomID = playerID.slice(-4);
    const res = await axios.get(GET_ROOM_API(roomID));
    if (resOk(res)) {
      if (setRoom == undefined) {
        return navigate("/lobby")
      }
      return setRoom(res.data)
    }
    if (pathname !== "/") {
      navigate("/")
    }
    localStorage.clear();
  } catch (error) {
    navigate("/")
    localStorage.clear()
    console.log(error);
  }
  
}
export async function JoinRoom(name: string, roomID: string, navigate: NavigateFunction) {
  try {
    const res = await axios.get(JOIN_ROOM_API(name, roomID))
    if (resOk(res)) {
      localStorage.setItem("id",res.data.PlayerID)
      navigate("/lobby")
    }
  } catch (error: any) {
    alert(error.response.data.Message)
  }
}
export async function CreateRoom(name: string, navigate: NavigateFunction) {
  try {
    const res = await axios.get(CREATE_ROOM_API(name))
    if (resOk(res)) {
      localStorage.setItem("id",res.data.playerID)
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

export async function GetPlayer(id: string, setPlayer: React.Dispatch<React.SetStateAction<Player>>, setIsReady?: React.Dispatch<React.SetStateAction<boolean>>) {
  try {
    const res = await axios.get(GET_PLAYER_API(id))
    if (resOk(res)) {
      setPlayer(res.data)
      if (setIsReady !== undefined) {
        setIsReady(res.data.ready)
      }
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