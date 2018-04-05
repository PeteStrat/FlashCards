import { AsyncStorage } from 'react-native';

export function seedDb (decks) {
  try {
    console.log('Seeding Async Storage With Dummy Data');
    AsyncStorage.setItem('decks', JSON.stringify(decks)).then(() => {
      console.log('Seeding Successful');
    })
  }
  catch (error) {
    console.log('Error Seeding Async Storage \n', error);
  }
}
