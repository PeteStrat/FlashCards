import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet
} from 'react-native';

export default class ListDecks extends React.Component {
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
    color: 'black',
    backgroundColor: 'grey',
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#000',
    padding: 10
  }
});
