import { PlayerDisplay } from "./struct";
const isDebug = true;

export function SortPlayers (players: PlayerDisplay[]) {
  players.sort((a: any, b: any) => {
    return nameToNum( a.name ) - nameToNum( b.name );
  })
  return players
}

export function GetWinner (players: PlayerDisplay[]) {
  players.sort((a: any, b: any) => {
    return a.score - b.score;
  })

  const bestScore = players[0].score;
  var winner = players.filter((p) => p.score == bestScore)
  if (winner.length == 1){
    return winner[0].name
  }
  var winners : string = ""
  for (const w of winner) {
    winners += w.name + " and "
  }

  return winners.slice(0, -4)

}

export function hasWhiteSpace(s: string) {
  return /\s/g.test(s);
}

export function GetID() {
  if (!checkLocalStorage()) {
    return "" 
  }
  const id = localStorage.getItem("id") 
  if (id !== null) {
    return id
  }
  return ""
}

export function resOk(res: any) {
  return res.statusText == "OK"
} 

export function checkLocalStorage(){
  var test = 'test';
  try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
  } catch(e) {
      return false;
  }
}

function nameToNum(name: string) {
  let nameScore : number = 0
  for (var i = 0; i < name.length; i++) {
    if (name.charCodeAt(i) > 96) {
      nameScore = (nameScore*100) + name.charCodeAt(i) - 96
    } else {
      nameScore = (nameScore*100) + name.charCodeAt(i) - 54
    }
  }
  return nameScore
}

export function lg(msg: any, sel?: boolean) {
  if (isDebug || sel) {
    console.log(msg)
  }
}

export const actions = (action: number, card :number = 0, row : number = 0) => {
  return JSON.stringify({action: action, card: card, row: row})
}


