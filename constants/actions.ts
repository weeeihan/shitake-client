export const actions = (action: number, card :number = 0, row : number = 0) => {
  return JSON.stringify({action: action, card: card, row: row})
}


