import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  AsyncStorage,
  StyleSheet
} from 'react-native';

export default class ListDecks extends Component {
  state = {
  }
  componentDidMount() {
    AsyncStorage.getItem('decks').then((result) => {
      if (!result) {
        console.log('No Decks Found');
        return;
      }

      const decks = JSON.parse(result);
      this.setState((state) => {
        return {decks};
      });
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
                title='Take Quiz'
                color='orange'
                onPress={() => (this.props.navigation.navigate('DeckView'))}
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

        <View>
          {this.renderDecks()}
        </View>

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
