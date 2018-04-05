import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { addCard, getDeck } from '../utils/helpers';
import { orange } from '../utils/colors';


export default class CreateCard extends Component {
  state = {
    question: '',
    answer: '',
    deckName: ''
  }

  handleQuestionForm = (input) => {
    this.setState({question: input});
  }

  handleAnswerForm = (input) => {
    this.setState({answer: input});
  }

  componentDidMount () {
    const name = this.props.navigation.state.params.title;
    this.setState((state) => {
      return {...state, deckName: name}
    })
  }
  render () {
    const { question, answer, deckName } = this.state;

    return (
      <View>
        <Text> Add A Card To The Deck: {deckName} </Text>

          <TextInput
            style={styles.input}
            placeholder='Question'
            value=''
            onChangeText={this.handleQuestionForm}
          />
          <TextInput
            style={styles.input}
            placeholder='Answer'
            value=''
            onChangeText={this.handleAnswerForm}
          />
          <Button
            title='Create Card'
            color={orange}
            onPress={
                () => {
                // Call AddCard Function & pass callback to navigate to DeckView with new cards
                addCard(deckName, {question, answer}, (response) => {
                  this.props.navigation.navigate('DeckView', { title: deckName });
                })
              }
            }
          />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 44,
    // padding: 8,
    borderWidth: 1,
    borderColor: 'black',
    margin: 10
  }
})
