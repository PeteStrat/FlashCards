import React, { Component } from 'react';
import {
  Stylesheet,
  View,
  Text,
  Button
} from 'react-native';


export default class QuizView extends Component {
  render () {
    const {deckData} = this.props.navigation.state.params

    return (
      <View>
        <Text> QUIZ VIEW </Text>
      </View>
    );
  }
}
