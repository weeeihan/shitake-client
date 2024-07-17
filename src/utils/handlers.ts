import axios from "axios"; 
import { CONNECT_API, CREATE_ROOM_API, JOIN_ROOM_API } from "./api";
import { resOk } from "./utils";

export async function JoinRoom(name: string, state: any, roomID: string, fetchData: (state:any)=> void){
  try {
    const res = await axios.get(JOIN_ROOM_API(name, roomID))
    if (resOk(res)) {
      localStorage.setItem("id",res.data.id)
      fetchData(state)
    }
  } catch (error: any) {
    alert(error.response.data.Message)
  }
}

export async function CreateRoom(name: string, state: any,fetchData: (state:any)=> void){
  try {
    // console.log("Creating room!")
    const res = await axios.get(CREATE_ROOM_API(name))
    // console.log(res)
    if (resOk(res)) {
      console.log(res)
      localStorage.setItem("id",res.data.id)
      fetchData(state)
    }
  } catch (error:any) {
    console.log(error)
    alert(error.response.data.Message)

  }
}

export async function ConnectToGame(id: string, setConn: (conn: WebSocket)=> void) {
  const ws = new WebSocket(CONNECT_API(id))
  console.log("Connecting")
  if (ws.OPEN) {
    console.log("connected")
    setConn(ws)
    return
  }
}

