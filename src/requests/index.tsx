import axios from "axios";
import env from '../constants/env';

export async function createNewDeck(): Promise<object> {
  let result = await axios.request({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    url: env.pathes.newDeck,
  });
  return result
}

export async function drawCard(deckID: string): Promise<object> {
  let result = await axios.request({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${env.domain}deck/${deckID}/draw/?count=1`,
  });
  return result
}


