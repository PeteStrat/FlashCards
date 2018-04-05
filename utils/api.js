import { AsyncStorage } from 'react-native';

export function seedDb (decks, callback) {
  try {
    AsyncStorage.setItem('decks', JSON.stringify(decks)).then(() => {
      callback();
    })
  }
  catch (error) {
    console.error('Error Seeding Async Storage \n', error);
  }
}
