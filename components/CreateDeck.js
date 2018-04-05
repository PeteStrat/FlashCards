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
import { orange, white } from '../utils/colors';

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
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center'
  },
  input: {
    alignSelf: 'stretch',
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    height: 30
  }
})
