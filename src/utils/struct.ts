export type Room = {
  id: string
  state: string
  players: PlayerDisplay[]
  deck: number[][]

}

export type PlayerDisplay = {
  name: string
  score: number
  ready: boolean
}

export type Game = {
  id: string
  deck: number[][]
  state: number
  players: PlayerDisplay[]

}

export type Message = {
  id: string
  gameID: string
  state: number 
  remark: string
}

// export type Player = {
//   id: string
//   // name: string
//   // roomID: string
//   // hands?: number[]  
//   // score?: number 
// }

export type Player = {
  id: string
  name: string
  score: number
  hand: number[]
  ready: boolean 
} 