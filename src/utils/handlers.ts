import axios from "axios"; 
import {  NavigateFunction } from "react-router-dom";
import { CHECK_PLAYER_API, CONNECT_API, CREATE_ROOM_API, GET_CONSTANTS_API, GET_DATA_API, GET_MUSHROOM_API, GET_PLAYER_API, GET_ROOM_API, GET_STATES_API, JOIN_ROOM_API, LEAVE_ROOM_API } from "./api";
import { resOk } from "./utils";
import React, { useContext } from "react";
import { Room, Player, GameData } from "./struct";
import { useQuery } from "@tanstack/react-query";

// export async function GetStates(setGameConstants: React.Dispatch<React.SetStateAction<any>>) {
//   const res = await axios.get(GET_STATES_API);
//   if (resOk(res)) {
//     setGameConstants((prevState: any) => ({
//       ...prevState,
//       State: res.data,
//       // Mushrooms: prevState.Mushrooms
//     }));
//   }
// }

export function FetchConstants() {
  return useQuery({
    queryKey: ["constants"],
    queryFn: async () => {
      const res = await axios.get(GET_CONSTANTS_API);
      return res.data
    }
  })
}

export function FetchStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: async () =>  {
      const res = await axios.get(GET_STATES_API); 
      return res.data
    }
  })
}

export function FetchMushrooms() {
  return useQuery({
    queryKey: ["mushrooms"],
    queryFn: async () => {
      const res = await axios.get(GET_MUSHROOM_API);
      return res.data
    }
  })
}

// export async function FetchRoom(id: string) {
//   let roomId = id.slice(-4) 
//   const res = await axios.get(GET_ROOM_API(roomId));
//   return res.data
// }

// export async function FetchPlayer(id: string) {
//   const res = await axios.get(GET_PLAYER_API(id));
//   return res.data
// }

export async function FetchData(id: string) {
  if (id === "none") {
    return {} as GameData
  }
  const res = await axios.get(GET_DATA_API(id));
  return res.data
}




// export async function GetMushrooms(setGameConstants: React.Dispatch<React.SetStateAction<any>>) {
//   const res = await axios.get(GET_MUSHROOM_API);
//   if (resOk(res)) {
//     setGameConstants((prevState: any) => ({
//       ...prevState,
//       // State: prevState.State,
//       Mushrooms: res.data
//     }));
//   }
// }



export async function GetPlayer(playerID: string, setGameData: React.Dispatch<React.SetStateAction<GameData>>) {  
  try {
    const res = await axios.get(GET_PLAYER_API(playerID))
    if (resOk(res)) {
      setGameData((prevState: GameData) => ({
        ...prevState,
        player: res.data
      }))
      // if (loc == "/") {
      //   navigate("/lobby")
      // }
    }
  } catch (error: any) {
    // if (loc !== "/") {
    //   navigate("/")
    // }
    localStorage.clear()
  }
}
export async function GetRoom(playerID: string, setGameData: React.Dispatch<React.SetStateAction<GameData>>) {
  try {
    const roomID = playerID.slice(-4);
    const res = await axios.get(GET_ROOM_API(roomID));
    if (resOk(res)) {
      setGameData((prevState: GameData) => ({
        ...prevState,
        roomData: res.data
      }))
      // if (loc == "/") {
        // if (res.data.state == "INIT") {
        //   navigate("/lobby")
        // } else {
        //   navigate("/game")
        // }
      // }
    }
  } catch (error) {
    setGameData((prevState: GameData) => ({
      ...prevState,
      roomData: {id: "ERROR", state: "", players: [], deck: [], chooser: "", played: null, moves: []}
    }))
    localStorage.clear()
  }
  
}
// export async function JoinRoomBU(name: string, roomID: string, setGameData: React.Dispatch<React.SetStateAction<GameData>>, navigate: NavigateFunction) {
//   try {
//     const res = await axios.get(JOIN_ROOM_API(name, roomID))
//     if (resOk(res)) {
//       setGameData((prevState: GameData) => ({
//         ...prevState,
//         player: res.data
//       }))
//       localStorage.setItem("id",res.data.id)
//       navigate("/lobby")
//     }
//   } catch (error: any) {
//     alert(error.response.data.Message)
//   }
// }

export async function JoinRoom(name: string, roomID: string, navigate: NavigateFunction) {
  try {
    const res = await axios.get(JOIN_ROOM_API(name, roomID))
    if (resOk(res)) {
      localStorage.setItem("id",res.data.id)
      navigate("/lobby")
    }
  } catch (error: any) {
    alert(error.response.data.Message)
  }
}
// export async function CreateRoomBU(name: string,setGameData: React.Dispatch<React.SetStateAction<GameData>>, navigate: NavigateFunction) {
//   try {
//     const res = await axios.get(CREATE_ROOM_API(name))
//     if (resOk(res)) {
//       setGameData((prevState: GameData) => ({
//         ...prevState,
//         player: res.data
//       }))
//       localStorage.setItem("id",res.data.id)
//       navigate("/lobby")
//     }
//   } catch (error:any) {
//     alert(error.response.data.Message)

//   }
// }

export async function CreateRoom(name: string, navigate: NavigateFunction) {
  try {
    const res = await axios.get(CREATE_ROOM_API(name))
    if (resOk(res)) {
      localStorage.setItem("id",res.data.id)
      navigate("/lobby")
    }
  } catch (error:any) {
    alert(error.response.data.Message)

  }
}

export async function ConnectToGame(id: string, setConn: (conn: WebSocket)=> void, connRef: React.MutableRefObject<WebSocket | null>) {
  const ws = new WebSocket(CONNECT_API(id))
  if (ws.OPEN) {
    connRef.current = ws
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