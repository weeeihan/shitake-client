import { PlayerDisplay } from "@/structs/structs";

export function GetWinner (players: PlayerDisplay[]) {
  players.sort((a: any, b: any) => {
    return b.score - a.score;
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

export function GetPlayer() {
  const player = localStorage.getItem("Player")
  if (player) {
    return JSON.parse(player)
  }
  return null
}