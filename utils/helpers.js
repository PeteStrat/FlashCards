import { AsyncStorage } from 'react-native';
const DECKS = 'decks';

export function getDecks ({}, callback) {
  AsyncStorage.getItem(DECKS).then((result) => {
    if (!result) {
      console.log('No Decks Found');
      return false;
    }
    const decks = JSON.parse(result);
    return callback(decks);
  });
}

export function addCard(deckTitle, card, callback) {
  AsyncStorage.getItem(DECKS).then((result) => {
    let allDecks = JSON.parse(result);
    allDecks[deckTitle]['questions'].push(card);

    AsyncStorage.setItem(DECKS, JSON.stringify(allDecks)).then(() => {
      return callback(allDecks[deckTitle]);
    })
  });
}

export function getDeck (title, callback) {
  AsyncStorage.getItem(DECKS).then((result) => {
    const allDecks = JSON.parse(result);
    return callback(allDecks[title]);
  });
}
