
interface deckType {
  status: boolean
  id: string,
  remaining: number,
  shuffled: boolean,
}

interface cardType {
  image: string,
  value: string,
  suit: string,
}

export type {
  deckType,
  cardType
}
