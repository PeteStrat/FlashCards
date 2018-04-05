import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity
} from 'react-native';
import { getDecks } from '../utils/helpers';
import { orange, blue, white } from '../utils/colors'

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
            <TouchableOpacity
              style={styles.deck}
              key={title}
              onPress={() => (this.props.navigation.navigate('DeckView', { title } ))}
            >
              <View>
                <Text> Deck Name: {title} </Text>
                <Text> Total Cards: {deckSize}  </Text>
              </View>
            </TouchableOpacity>
          );
        })
      )
    } else {
      return (<Text> Please Create A Deck </Text>);
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Card Decks </Text>
        <ScrollView> {this.renderDecks()} </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'black',
  },
  title: {
    color: white,
    backgroundColor: 'black',
    textAlign: 'center',
    paddingBottom: 5
  },
  deck: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30,
    margin: 10,
    borderBottomWidth: 1,
    backgroundColor: 'grey',
    borderColor: '#000'
  }
});
