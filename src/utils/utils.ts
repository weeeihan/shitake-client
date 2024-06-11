import { Player, PlayerDisplay } from "./struct";
const isDebug = true;
import { useEffect, useRef, useState } from "react";

export function SortPlayers (players: PlayerDisplay[]) {
  players.sort((a: any, b: any) => {
    return nameToNum( a.name ) - nameToNum( b.name );
  })
  return players
}


// export function GetWinner (players: PlayerDisplay[]) {
//   const bestScore = players[0].score;
//   var winner = players.filter((p) => p.score == bestScore)
//   if (winner.length == 1){
//     return winner[0].name
//   }
//   var winners : string = ""
//   for (const w of winner) {
//     winners += w.name + " and "
//   }
//   return winners.slice(0, -4)
// }

export function hasWhiteSpace(s: string) {
  return /\s/g.test(s);
}

export function GetID() {
  if (!checkLocalStorage()) {
    return "none" 
  }
  const id = localStorage.getItem("id") 
  if (id !== null) {
    if (id == "") return "none"
    return id
  }
  return "none"
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

export function useCountdown(seconds: number, onEnd: () => any) {
  let [remaining, setRemaining] = useState(seconds);

  console.log(remaining)
  useEffect(() => {
    console.log("COUNTING")
    function tick() {
      setRemaining(remaining - 1);
    }

    const countdown = setInterval(tick, 1000);

    if (remaining == 0) {
      clearInterval(countdown);
      onEnd();
    }

    return () => clearInterval(countdown);
  }, [remaining]);

  return remaining;
}

const randomHundred = [51, 9, 98, 8, 84, 46, 28, 22, 7, 86, 80, 67, 74, 49, 82, 55, 16, 11, 87, 26, 71, 39, 85, 53, 63, 25, 62, 50, 1, 38, 99, 34, 35, 24, 33, 76, 27, 43, 20, 90, 91, 79, 58, 19, 15, 10, 45, 65, 56, 41, 30, 47, 17, 42, 44, 75, 2, 73, 60, 14, 31, 89, 37, 40, 70, 96, 95, 36, 54, 48, 97, 13, 3, 52, 68, 83, 57, 81, 23, 32, 21, 64, 18, 4, 92, 29, 72, 0, 59, 66, 77, 94, 12, 5, 78, 69, 88, 93, 61, 6]

export function getY(weight: number) {
  // console.log((randomHundred[weight]/2.5 ))
  return (randomHundred[weight]/2.5 ) - 30 
}

export function getX(weight: number) {
  return (randomHundred[weight]/3.5 - 5) 
}

export function getTotalDamge(row: number[], Mushroom: any) {
  var total = 0
  for (const card of row) {
    total += Mushroom[card].damage
  }
  return total
}

 
export function useInterval(callback: any, delay: any) {
  const savedCallback = useRef<any>();
 
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
 
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


export function play(played: any, deck: number[][], choseRow?: number) : number[][]{
  console.log("RERUN")
  let sortable = []
  let start = 0
  for (var player in played) {
    sortable.push([player, played[player]])
  }
  sortable.sort(function(a,b) {
    return a[1] - b[1]
  })
  
  if (choseRow !== undefined) {
    sortable[0].push(choseRow, 1)
    start++
  }

  let isFound = false

  for (var i = start; i < sortable.length; i++) {
    let spore = sortable[i][1]
    let optimal = 0;
    let least = 10000;
    for (let j = 0; j < deck.length; j++) {
      let row = deck[j];
  
      if (row[row.length - 1] < spore && spore - row[row.length - 1] < least) {
        least = spore - row[row.length - 1];
        optimal = j;
        isFound = true
      }
    }
    if (deck[optimal].length === 5) {
      deck[optimal] = [spore];
      sortable[i].push(...[optimal, 5])
      continue
    }

    sortable[i].push(...[optimal, deck[optimal].length])
    deck[optimal].push(spore);
    
  }

  return sortable 
  // let temp = [...data];
}

export function getResults(players: PlayerDisplay[])  {
  let survivors = []
  let fallen = []
  for (let i =0; i< players.length; i++) {
    if (players[i].hp <= 0) {
      fallen.push(players[i])
      continue
    }
    survivors.push(players[i])
  } 

  survivors.sort((a:PlayerDisplay, b:PlayerDisplay) => b.hp - a.hp)
  fallen.sort((a:PlayerDisplay, b:PlayerDisplay) => b.hp - a.hp)


  return [survivors, fallen] 
}