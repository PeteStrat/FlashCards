import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { orange, blue, white, black, red } from '../utils/colors';
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
      <View style={styles.container}>
        <Text style={styles.stats}> Deck Name: {title} </Text>
        <Text style={styles.stats}> Total Cards: {questions.length}  </Text>
        <Button
          title='Take Quiz'
          color={red}
          onPress={() => (this.props.navigation.navigate('QuizView', { title }))}
        />

        <Button
          title='Add A Card'
          color={red}
          onPress={() => (this.props.navigation.navigate('CreateCard', { title }))}
        />

          <Button
            title='View All Decks'
            color={blue}
            onPress={() => (this.props.navigation.navigate('All Decks'))}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: white,
  },
  button : {
    backgroundColor: red,
    color: red
  },
  stats: {
    textAlign: 'center',
    fontSize: 24,
    paddingBottom: 20,
    color: black
  }
});
