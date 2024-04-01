import { Player } from "@/structs/structs"


export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://85e2-2001-e68-542d-29d0-acb8-d80c-2056-a3d2.ngrok-free.app"
export const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://85e2-2001-e68-542d-29d0-acb8-d80c-2056-a3d2.ngrok-free.app"

export const JOIN_ROOM_API = (name: string, roomID: string) => {
  return `${API_URL}/ws/joinRoom/${roomID}?name=${name}`
}

export const LEAVE_ROOM_API = (player: Player) => {
  return `${API_URL}/ws/leaveRoom/${player.id}`

}

export const CONNECT_API = (player:Player) => {
  return `${WEBSOCKET_URL}/ws/connectToGame/${player.roomID}?playerID=${player.id}`
}

export const GET_ROOM_API = (roomID: string) => {
  return  `${API_URL}/ws/getRoom/${roomID}`
}

// get game
export const GET_GAME_API = (roomID: string) => {
  return `${API_URL}/ws/getGame/${roomID}`
}

export const CREATE_ROOM_API = (name: string) => {
  return (`${API_URL}/ws/createRoom?name=${name}`)
}

export const GET_PLAYER_API = (playerID: string, roomID:string) => {
  return (`${API_URL}/ws/getPlayer/${playerID}/${roomID}`)
}