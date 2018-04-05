import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { addCard } from '../utils/helpers';
import { orange } from '../utils/colors';


export default class CreateCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  handleQuestionForm = (input) => {
    this.setState({question: input});
  }

  handleAnswerForm = (input) => {
    this.setState({answer: input});
  }
  render () {
    const { question, answer } = this.state;
    const {deckData} = this.props.navigation.state.params;
    const deckTitle = deckData['title'];

    return (
      <View>
        <Text> Add A Card To The Deck: {deckData['title']} </Text>


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
                // Call AddCard Function & pass callback to render deck with new cards
                addCard(deckData['title'], {question, answer}, (response) => {
                  this.props.navigation.navigate('DeckView', { deckData: response })
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
