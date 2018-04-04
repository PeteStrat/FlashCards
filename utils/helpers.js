import { AsyncStorage } from 'react-native';

export function getDecks ({}, callback) {
  AsyncStorage.getItem('decks').then((result) => {
    if (!result) {
      console.log('No Decks Found');
      return false;
    }
    const decks = JSON.parse(result);
    return callback(decks);
  });
}
