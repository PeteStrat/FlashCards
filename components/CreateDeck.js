import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView
} from 'react-native';
import { saveDeckTitle } from '../utils/helpers';
import { orange } from '../utils/colors';

export default class CreateDeck extends Component {
  state = {
    deckName: ''
  }
  handleDeckName = (input) => {
    this.setState({deckName: input});
  }

  render () {
    const { deckName } = this.state;

    return (
      <View>
        <Text> Create A Deck </Text>

        <TextInput
            style={styles.input}
            placeholder='Deck Name'
            value=''
            onChangeText={this.handleDeckName}
          />
        <Button
          title='Create Deck'
          color={orange}
          onPress={() => {
            saveDeckTitle(deckName, () => (
              this.props.navigation.navigate('DeckView', { title: deckName })
            ))
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 44,
    borderWidth: 1,
    borderColor: 'black',
    margin: 10
  }
})
