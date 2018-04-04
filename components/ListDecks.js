import React from 'react';
import {
  View,
  Text,
  AsyncStorage
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
          return (
            <Text key={title}> {title} </Text>
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
        <Text> List of Decks Component </Text>
        {this.renderDecks()}
      </View>
    );
  }
}
