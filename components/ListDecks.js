import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { getDecks } from '../utils/helpers';
import { orange } from '../utils/colors'

export default class ListDecks extends Component {
  state = {};

  componentDidMount() {
    getDecks({}, (result) => {
      this.setState((state) => {
        return { decks: result }
      })
    });
  }

  renderDecks = () => {
    const { decks } = this.state;
    if (decks) {
      return (
        Object.keys(decks).map((deck) => {
          const title = decks[deck]['title'];
          const deckSize = decks[deck]['questions'].length;
          return (
            <View style={styles.deck} key={title}>
              <Text> Deck Name: {title} </Text>
              <Text> Total Cards: {deckSize}  </Text>
              <Button
                title='View Deck'
                color={orange}
                onPress={() => (this.props.navigation.navigate('DeckView', { title } ))}
              />
            </View>
          );
        })
      )
    } else {
      return (<Text> Please Create A Deck </Text>);
    }
  }

  render () {
    return (
      <View>
        <Text> Card Decks </Text>
        <ScrollView> {this.renderDecks()} </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckList: {

  },
  deck: {
    backgroundColor: 'grey',
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#000',
    padding: 10
  }
});
