import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { orange } from '../utils/colors';

export default class DeckView extends Component {
  render () {
    const { deckData } = this.props.navigation.state.params;

    return (
      <View>
        <Text> Deck Name: {deckData.title} </Text>
        <Text> Total Cards: {deckData.questions.length}  </Text>
        <Button
          title='Take Quiz'
          color={orange}
          onPress={() => (this.props.navigation.navigate('QuizView', { deckData }))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
