
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const DECKS = 'decks';
const NOTIFICATION_KEY = 'blahBlahblah';

export function getDecks ({}, callback) {
  AsyncStorage.getItem(DECKS).then((result) => {
    if (!result) {
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

export function saveDeckTitle (title, callback) {
  AsyncStorage.getItem(DECKS).then((results) => {
    let allDecks = JSON.parse(results);
    allDecks[title] = {
      title, questions: []
    }
    AsyncStorage.setItem(DECKS, JSON.stringify(allDecks)).then(() => {
      return callback(title);
    });
  });
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  );
}

function createNotification () {
  return {
    title: "Don't Forget To Study",
    body: 'Check Your Self',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if ( data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
