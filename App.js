import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  AsyncStorage
} from 'react-native';
import { red, pink, orange } from './utils/colors';
import { Constants } from 'expo';
import { TabNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import ListDecks from './components/ListDecks';
import CreateDeck from './components/CreateDeck';

import deckSamples from './utils/deckSamples';
import { seedDb } from './utils/api';

function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}} >
      <StatusBar translucent={true} backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

function Home () {
  return (
    <View>
      <Text> HOME PAGE </Text>
    </View>
  )
}


const Tabs = TabNavigator({
  'All Decks': {
    screen: ListDecks,
    navigationOptions: {
      tabBarIcon: () => <Ionicons name='ios-card-outline' size={30} color='black' />
    }
  },
  'Create Deck': {
    screen: CreateDeck,
    navigationOptions: {
      tabBarIcon: () => <FontAwesome name='plus-square' size={30} color='black'  />
    }
  }
})

export default class App extends React.Component {
  componentDidMount () {
    // Fill Async Storage with dummy data for testing
    AsyncStorage.getAllKeys().then((keys) => {
      if (keys.length < 1) {
        seedDb(deckSamples)
      } else {
        console.log('Async Storage Contains Dummy Decks');
      }
    });

    // AsyncStorage.clear();
  }


  render() {
    return (
      <View
      style={ {flex: 1} }
      >
        <CustomStatusBar backgroundColor={orange} barStyle='light-content' />
        <Tabs />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
