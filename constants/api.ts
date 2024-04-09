

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080"
export const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://127.0.0.1:8080"

export const JOIN_ROOM_API = (name: string, roomID: string) => {
  return `${API_URL}/ws/joinRoom/${roomID}?name=${name}`
}

export const LEAVE_ROOM_API = (id: string) => {
  return `${API_URL}/ws/leaveRoom/${id}`

}

export const CONNECT_API = (id: string) => {
  const roomID = id.slice(-4)
  return `${WEBSOCKET_URL}/ws/connectToGame/${roomID}?playerID=${id}`
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

export const GET_PLAYER_API = (id: string) => {
  const roomID = id.slice(-4)
  return (`${API_URL}/ws/getPlayer/${id}/${roomID}`)
}