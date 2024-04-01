import { CONNECT_API, GET_ROOM_API, JOIN_ROOM_API, CREATE_ROOM_API, LEAVE_ROOM_API, GET_GAME_API, GET_PLAYER_API  } from "@/constants/api";
import { Game, PlayerData, Player } from "@/structs/structs";
import { Room } from "@/structs/structs";
import { NextRouter } from "next/router";

export async function JoinRoom (name: string, roomID: string, router: NextRouter) {
  
  try {
    const res = await fetch(JOIN_ROOM_API(name, roomID), {
      method: "GET",
      headers : {"Content-Type" : "application/json"},
    })
    const data = await res.json()
    if (res.ok) {
      const player : Player = {id: data.PlayerID, name: name, roomID: roomID}
      localStorage.setItem("Player",JSON.stringify(player))
      console.log(player)
      router.push("/lobby")
      return
      // join room
    }
    alert(data.Message)
  } catch (error: any) {
    console.log(error)
  }

}

export async function LeaveRoom (player: Player, router: NextRouter) {
  try {
    const res = await fetch(LEAVE_ROOM_API(player), {
      method: "GET",
      headers : {"Content-Type" : "application/json"},
    })
    if (res.ok) {
      localStorage.clear()
      router.push("/")
    }
  } catch (error) {
    console.log(error)
  }
}

export async function ConnectToGame(player:Player, setConn: (conn: WebSocket) => void) {
  const ws = new WebSocket(CONNECT_API(player))
  if (ws.OPEN) {
    setConn(ws)
    return
  }
}

export async function CheckRoom (roomID: string, router: NextRouter) {
  try {
    const res = await fetch(GET_ROOM_API(roomID), {
      method: "GET",
      headers : {"Content-Type" : "application/json"},
    })
    const data = await res.json()
    if (res.ok) {
      router.push("/lobby")
      return
    }
    // if room not found, clear localstorage
    localStorage.clear()
  } catch (error) {
    localStorage.clear()
    router.push("/")
    console.log(error)
  }
}

export async function CreateRoom(name: string, router: NextRouter) {
  try {
    const res = await fetch(CREATE_ROOM_API(name), {
      method: "GET",
      headers : {"Content-Type" : "application/json", 'ngrok-skip-browser-warning':true},
    })
    const data = await res.json() 
    if (res.ok) {
      console.log(data)
      var player : Player = {id: data.playerID ,name: name, roomID: data.roomID}
      localStorage.setItem("Player",JSON.stringify(player))
      router.push("/lobby")
    }
  } catch (error) {
    console.log(error)
  }
}

export async function GetRoomData(roomID: string, router: NextRouter ,setRoomData: React.Dispatch<React.SetStateAction<Room>> ) {
  try {
    const res = await fetch(GET_ROOM_API(roomID), {
      method: "GET",
      headers : {"Content-Type" : "application/json", "Accept" : "application/json", 'ngrok-skip-browser-warning':true},
    })
    const data = await res.json()
    if (res.ok) {
      setRoomData(data)
    } else {
      localStorage.clear()
      router.push("/")
    }
  } catch (error) {
    localStorage.clear()
    router.push("/")
    console.log(error)
  }
}

export async function GetGameData(roomID: string, setGamedata: React.Dispatch<React.SetStateAction<Game>>, router : NextRouter) {
  try {
    const res = await fetch(GET_GAME_API(roomID), {
      method: "GET",
      headers : {"Content-Type" : "application/json"},
    })
    const data = await res.json()
    if (data.Message == "Game does not exist") {
      localStorage.clear()
      router.push("/")
      return
    }
    if (res.ok) {
      setGamedata(data)
      console.log("here?")
    }
  } catch (error) {
    // console.log("here")
    // localStorage.clear()
    // console.log(error)
  }
}

// get player
export async function GetPlayer(player: Player, setPlayerData: React.Dispatch<React.SetStateAction<PlayerData>>) {
  try {
    const res = await fetch(GET_PLAYER_API(player.id, player.roomID), {
      method: "GET",
      headers : {"Content-Type" : "application/json"},
    })
    const data = await res.json()
    if (res.ok) {
      setPlayerData(data)
    }
  } catch (error) {
    console.log(error)
  } 
}

