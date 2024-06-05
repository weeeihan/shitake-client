export type Room = {
  id: string
  state: string
  players: PlayerDisplay[]
  deck: number[][]
  chooser: string
  played: any 
  moves: string[][]
}


export type PlayerDisplay = {
  name: string
  hp: number
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
  hp: number
  hand: number[]
  ready: boolean 
  play: number
  damageReport: DamageReport
} 

export type DamageReport = {
  mushrooms: number[]
  damage: number
  roundMushrooms: number[]
  roundDamage: number
}

export type Played = {
  name: string
  card: number
}


export type GameConstants = {
  State: any;
  Mushrooms: any;
};

export type GameStates = {
  isAlready: boolean;
  handToggle: boolean;
  showPlaying: boolean;
  bottomDisp: string;
  currentDeck: number[][];
  hand: number[];
  selected: number;
  played: number[][];
  prevPlayed: any;
};

export type GameData = {
  player: Player;
  roomData: Room;
};
