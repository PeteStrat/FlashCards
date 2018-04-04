import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import { red, pink, orange } from './utils/colors';
import { Constants } from 'expo';
import { DrawerNavigator } from 'react-navigation';

function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}} >
      <StatusBar translucent={true} backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <View
      style={ {flex: 1} }
      >
        <CustomStatusBar backgroundColor={orange} barStyle='light-content' />

        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
