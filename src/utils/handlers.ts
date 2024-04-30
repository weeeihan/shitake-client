import axios from "axios"; 
import {  NavigateFunction } from "react-router-dom";
import { CHECK_PLAYER_API, CONNECT_API, CREATE_ROOM_API, GET_PLAYER_API, GET_ROOM_API, JOIN_ROOM_API, LEAVE_ROOM_API } from "./api";
import { resOk } from "./utils";
import React from "react";
import { Room, Player } from "./struct";

export async function GetPlayer(playerID: string, setPlayerStatus: React.Dispatch<React.SetStateAction<string>>, setPlayer: React.Dispatch<React.SetStateAction<Player>>) {
  try {
    const res = await axios.get(GET_PLAYER_API(playerID))
    if (resOk(res)) {
      setPlayerStatus("Success")
      setPlayer(res.data)
    }
  } catch (error: any) {
    localStorage.clear()
    setPlayerStatus("Fail")
  }
}
export async function GetRoom(playerID: string, setPlayerStatus: React.Dispatch<React.SetStateAction<string>>,  setRoom:React.Dispatch<React.SetStateAction<Room>>) {
  try {
    const roomID = playerID.slice(-4);
    const res = await axios.get(GET_ROOM_API(roomID));
    if (resOk(res)) {
      setRoom(res.data)
    }
  } catch (error) {
    setPlayerStatus("Fail")
    localStorage.clear()
  }
  
}
export async function JoinRoom(name: string, roomID: string, setPlayer: React.Dispatch<React.SetStateAction<Player>>, setPlayerStatus: React.Dispatch<React.SetStateAction<string>>) {
  try {
    const res = await axios.get(JOIN_ROOM_API(name, roomID))
    if (resOk(res)) {
      setPlayer(res.data)
      localStorage.setItem("id",res.data.id)
      setPlayerStatus("Success")
    }
  } catch (error: any) {
    alert(error.response.data.Message)
  }
}
export async function CreateRoom(name: string,setPlayer: React.Dispatch<React.SetStateAction<Player>>, setPlayerStatus: React.Dispatch<React.SetStateAction<string>>) {

  try {
    const res = await axios.get(CREATE_ROOM_API(name))
    if (resOk(res)) {
      setPlayer(res.data)
      localStorage.setItem("id",res.data.id)
      setPlayerStatus("Success")
    }
  } catch (error:any) {
    alert(error.response.data.Message)

  }
}

export async function ConnectToGame(id: string, setConn: (conn: WebSocket)=> void) {
  const ws = new WebSocket(CONNECT_API(id))
  if (ws.OPEN) {
    setConn(ws)
    return
  }
}

// export async function GetPlayer(id: string, setPlayer: React.Dispatch<React.SetStateAction<Player>>) {
//   try {
//     const res = await axios.get(GET_PLAYER_API(id))
//     if (resOk(res)) {
//       setPlayer(res.data)

//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

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