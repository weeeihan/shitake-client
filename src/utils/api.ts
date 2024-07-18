

// Testing with render


// export const API_URL = "http://localhost:8080"
// export const WEBSOCKET_URL = "ws://localhost:8080"
// export const API_URL = "https://shitake-server.fly.dev"
// export const WEBSOCKET_URL = "ws://shitake-server.fly.dev"
export const API_URL = "https://shitake-server.onrender.com"
export const WEBSOCKET_URL = "wss://shitake-server.onrender.com"


export const GET_STATES_API = `${API_URL}/getStates`

export const GET_MUSHROOM_API = `${API_URL}/getMushrooms`
export const GET_CONSTANTS_API = `${API_URL}/getConstants`

export const CHECK_PLAYER_API = (id: string) => {
  return `${API_URL}/ws/checkPlayer/${id}`
}

export const JOIN_ROOM_API = (name: string, roomID: string) => {
  return `${API_URL}/ws/joinRoom/${roomID}?name=${name}`
}

export const LEAVE_ROOM_API = (id: string) => {
  return `${API_URL}/ws/leaveRoom/${id}`

}

export const CONNECT_API = (id: string) => {
  return `${WEBSOCKET_URL}/ws/connectToGame/${id}`
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
  return (`${API_URL}/ws/getPlayer/${id}`)
}

export const GET_DATA_API = (id: string) => {
  return (`${API_URL}/getData/${id}`)
}

