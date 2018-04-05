import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import {
  getDeck,
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers';
import { blue, red, lightPurp, white, black } from '../utils/colors';

export default class QuizView extends Component {
  state = {
    questionIndex: 0,
    correctAnswers: 0,
    questions: [],
    deckName: '',
    showAnswer: false
  }

  componentDidMount () {
    const deckName = this.props.navigation.state.params.title;
    getDeck(deckName, (response) => (
      this.setState((state) => { return {...state, questions: response.questions, deckName} })
    ));
  }

  correctAnswer = () => {
    this.setState((state) => {
      return {
        ...state,
        correctAnswers: state[correctAnswers]++
      }
    })
  }

  renderQuestion = () => {
    const { questions, questionIndex } = this.state;
    if ( questions && questions.length > 0) {
      return (
        <Text style={styles.deck}> {questions[questionIndex].question} </Text>
      );
    } else {
      return ( <Text> Question Rendering </Text>);
    }
  }

  renderAnswer = (index) => {
    const { questionIndex, showAnswer, questions } = this.state;

    if (showAnswer) {
      return (
        <Text style={styles.answer}> The Answer Is: {questions[questionIndex]['answer']} </Text>
      )
    } else {
      return (<Text />)
    }
  }

  allowAnswer = () => {
    this.setState((state) => {
      return {
        ...state,
        showAnswer: !state['showAnswer']
      }
    })
  }

  handleAnswer = (status) => {
    if (status === 'correct') {
      this.setState((state) => {
        return {
          ...state,
          questionIndex: state['questionIndex'] + 1,
          correctAnswers: state['correctAnswers'] + 1,
          showAnswer: false
        }
      });
    } else {
      this.setState((state) => {
        return {
          ...state,
          questionIndex: state['questionIndex'] + 1,
          showAnswer: false
        }
      })
    }
  }

  render () {
    const { questions, deckName , correctAnswers, questionIndex, showAnswer } = this.state;

    if (questionIndex == questions.length) {
      clearLocalNotification()
        .then(setLocalNotification)
      return (
        <View style={styles.container}>
          <Text style={styles.deck}> Done, Score {correctAnswers} out of {questions.length} </Text>

          <Button
            title='Restart Quiz'
            color={blue}
            onPress={() => {this.setState(
              {
                questionIndex: 0,
                correctAnswers: 0,
                showAnswer: false
              }
            )}}
          />
          <Button
            title='Back To Deck View'
            color={blue}
            onPress={() => (this.props.navigation.navigate('DeckView', { title: deckName } ))}
          />

          <Button
            title='View All Decks'
            color={blue}
            onPress={() => (this.props.navigation.navigate('All Decks'))}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}> Currently on Deck: {deckName} </Text>
        <Text style={styles.title}> {correctAnswers} out of {questionIndex + 1} Questions Correct </Text>
        <Text style={styles.title}> {questions.length - questionIndex} Questions Remaining </Text>
        {this.renderQuestion()}

        <Button
          title='Correct'
          color={blue}
          onPress={() => (this.handleAnswer('correct'))}
        />
        <Button
          title='Wrong'
          color={red}
          onPress={() => (this.handleAnswer('wrong'))}
        />
        <Button
          title={ (showAnswer) ? 'Hide Answer' : 'Show Answer'}
          color={lightPurp}
          onPress={() => (this.allowAnswer())}
        />
        {this.renderAnswer()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    paddingTop: 22,
    backgroundColor: white,
  },
  title: {
    textAlign: 'center',
    paddingBottom: 5,
    fontWeight: 'bold',
    fontSize: 16
  },
  deck: {
    textAlign: 'center',
    padding: 30,
    margin: 5,
    borderBottomWidth: 1,
    backgroundColor: 'grey',
    borderColor: '#000'
  },
  answer: {
    textAlign: 'center',
    color: white,
    padding: 30,
    margin: 5,
    borderBottomWidth: 1,
    backgroundColor: black,
    borderColor: '#000'
  }
});
