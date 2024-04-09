import { CONNECT_API, GET_ROOM_API, JOIN_ROOM_API, CREATE_ROOM_API, LEAVE_ROOM_API, GET_GAME_API, GET_PLAYER_API  } from "@/constants/api";
import { Game, Player  } from "@/structs/structs";
import { Room } from "@/structs/structs";
import { NextRouter } from "next/router";
import { resOk, lg } from "@/utils/utils";


const axios = require('axios')

export async function JoinRoom (name: string, roomID: string, router: NextRouter) {
  
  try {
    const res = await axios.get(JOIN_ROOM_API(name, roomID))
    if (resOk(res)) {
      localStorage.setItem("id",res.data.PlayerID)
      router.push("/lobby")
    }
  } catch (error: any) {
    lg(error)
  }

}

export async function LeaveRoom (id:string, router: NextRouter) {
  try {
    const res = await axios.get(LEAVE_ROOM_API(id))
    if (resOk(res)) {
      localStorage.clear()
      router.push("/")
    }
  } catch (error) {
    lg(error)
  }
}

export async function ConnectToGame(id: string, setConn: (conn: WebSocket) => void) {
  lg("Connect to game")
  const ws = new WebSocket(CONNECT_API(id))
  if (ws.OPEN) {
    setConn(ws)
    return
  }
}

export async function CheckRoom (playerID: string, router: NextRouter) {
  const roomID : string = playerID.slice(-4) 
  try {
    const res = await axios.get(GET_ROOM_API(roomID)) 
    if (resOk(res)) {
      console.log("Going back to LOBBY")
      router.push("/lobby")
    }
    // if room not found, clear localstorage
    // localStorage.clear()
  } catch (error) {
    localStorage.clear()
    router.push("/")
    lg(error)
  }
}

export async function CreateRoom(name: string, router: NextRouter) {
  try {
    const res = await axios.get(CREATE_ROOM_API(name))
    lg(res.data)
    if (resOk(res)) {
      lg(res)
      localStorage.setItem("id",res.data.playerID)
      router.push("/lobby")
    }
  } catch (error) {
    lg(error)
  }
}

export async function GetRoomData(id: string, router: NextRouter ,setRoomData: React.Dispatch<React.SetStateAction<Room>> ) {
  const roomID : string = id.slice(-4)
  lg("Get room")
  try {
    const res = await axios.get(GET_ROOM_API(roomID))
    if (resOk(res)) {
      setRoomData(res.data)
      lg(res.data)
    } else {
      localStorage.clear()
      router.push("/")
    }
  } catch (error) {
    localStorage.clear()
    router.push("/")
    lg(error)
  }
}

export async function GetGameData(id: string, setGamedata: React.Dispatch<React.SetStateAction<Game>>, router : NextRouter) {
  const roomID : string = id.slice(-4)
  try {
    const res = await axios.get(GET_GAME_API(roomID))
    if (res.data.Message == "Game does not exist") {
      localStorage.clear()
      router.push("/")
      return
    }
    if (resOk(res)) {
      setGamedata(res.data)
      lg("here?")
    }
  } catch (error) {
    lg("error!")
    // localStorage.clear()
    // lg(error)
  }
}

// get player
export async function GetPlayer(id: string, setPlayer: React.Dispatch<React.SetStateAction<Player>>, setIsReady: React.Dispatch<React.SetStateAction<boolean>>) {
  lg("Get player")
  try {
    const res = await axios.get(GET_PLAYER_API(id)) 
    if (resOk(res)) {
      setPlayer(res.data)
      lg(res.data)
      setIsReady(res.data.ready)
    }
  } catch (error) {
    lg(error)
  } 
}

