import axios from "axios"; 
import {  NavigateFunction } from "react-router-dom";
import { CHECK_PLAYER_API, CONNECT_API, CREATE_ROOM_API, GET_PLAYER_API, GET_ROOM_API, GET_STATES_API, JOIN_ROOM_API, LEAVE_ROOM_API } from "./api";
import { resOk } from "./utils";
import React, { useContext } from "react";
import { Room, Player } from "./struct";

export async function GetGamestate(setGamestate: React.Dispatch<React.SetStateAction<any>>) {
  const res = await axios.get(GET_STATES_API);
  if (resOk(res)) {
    setGamestate(res.data);
  }
}

export async function GetPlayer(playerID: string, setPlayer: React.Dispatch<React.SetStateAction<Player>>, loc : string, navigate: NavigateFunction) {  
  try {
    const res = await axios.get(GET_PLAYER_API(playerID))
    if (resOk(res)) {
      setPlayer(res.data)
      if (loc == "/") {
        navigate("/lobby")
      }
    }
  } catch (error: any) {
    if (loc !== "/") {
      navigate("/")
    }
    localStorage.clear()
  }
}
export async function GetRoom(playerID: string,setRoom:React.Dispatch<React.SetStateAction<Room>>, loc : string, navigate: NavigateFunction) {
  try {
    const roomID = playerID.slice(-4);
    const res = await axios.get(GET_ROOM_API(roomID));
    if (resOk(res)) {
      setRoom(res.data)
      if (loc == "/") {
        if (res.data.state == "INIT") {
          navigate("/lobby")
        } else {
          navigate("/game")
        }
      }
    }
  } catch (error) {
    localStorage.clear()
  }
  
}
export async function JoinRoom(name: string, roomID: string, setPlayer: React.Dispatch<React.SetStateAction<Player>>, navigate: NavigateFunction) {
  try {
    const res = await axios.get(JOIN_ROOM_API(name, roomID))
    if (resOk(res)) {
      setPlayer(res.data)
      localStorage.setItem("id",res.data.id)
      navigate("/lobby")
    }
  } catch (error: any) {
    alert(error.response.data.Message)
  }
}
export async function CreateRoom(name: string,setPlayer: React.Dispatch<React.SetStateAction<Player>>, navigate: NavigateFunction) {

  try {
    const res = await axios.get(CREATE_ROOM_API(name))
    if (resOk(res)) {
      setPlayer(res.data)
      localStorage.setItem("id",res.data.id)
      navigate("/lobby")
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