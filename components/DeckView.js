import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { orange } from '../utils/colors';
import { getDeck } from '../utils/helpers';

export default class DeckView extends Component {
  state = {
    title: '',
    questions: []
  }

  componentDidMount () {
    const deckName = this.props.navigation.state.params.title;
    getDeck(deckName, (response) => ( this.setState((state) => { return response })    ));
  }

  render () {
    const { title, questions } = this.state;
    return (
      <View>
        <Text> Deck Name: {title} </Text>
        <Text> Total Cards: {questions.length}  </Text>
        <Button
          title='Take Quiz'
          color={orange}
          onPress={() => (this.props.navigation.navigate('QuizView', { title }))}
        />

        <Button
          title='Add A Card'
          color={orange}
          onPress={() => (this.props.navigation.navigate('CreateCard', { title }))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
