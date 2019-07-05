import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import TouchableButton from './TouchableButton';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params
    
        return {
            title: `${deckTitle} quiz`
        }
    }

    state = {
        currentQuestion: 0,
        corrects: 0,
        incorrects: 0,
        viewAnswer: false,
        finished: false
    }

    handleShowAnswer = () => {
        this.setState(state => ({
            viewAnswer: !state.viewAnswer
        }))
    }

    handleCorrectClick = () => {
        this.setState(state => ({
            corrects: state.corrects + 1,
            currentQuestion: state.currentQuestion + 1
        }))
    }

    handleIncorrectClick = () => {
        this.setState(state => ({
            incorrects: state.incorrects + 1,
            currentQuestion: state.currentQuestion + 1
        }))
    }

    handleRestartQuiz = () => {
        const { deck } = this.props
        this.props.navigation.goBack()
        this.props.navigation.navigate('Quiz', { deckId: deck.id, deckTitle: deck.title })
    }

    render() {
        const { deck } = this.props
        const { currentQuestion, viewAnswer, corrects } = this.state
        if(currentQuestion + 1 <= deck.questions.length) {
            return (
                <View>
                    <Text style={styles.totalQuestions}>Question {currentQuestion+1} / {deck.questions.length}</Text>
                    <Text style={styles.totalQuestions}>{deck.questions.length - currentQuestion} remaining.</Text>
                    <View style={styles.content}>
                        <Text style={styles.question}>
                            {viewAnswer
                                ?
                                deck.questions[currentQuestion].answer
                                :
                                deck.questions[currentQuestion].question
                            }
                        </Text>
                        <Button title={viewAnswer ? 'Show question' : 'Show answer'} onPress={this.handleShowAnswer}/>
                        <View style={styles.buttons}>
                            <TouchableButton onPress={this.handleCorrectClick}>
                                Correct
                            </TouchableButton>
                            <TouchableButton red onPress={this.handleIncorrectClick}>
                                Incorrect
                            </TouchableButton>
                        </View>
                    </View>
                </View>
            )
        } else if (deck.questions.length === 0) {
            return (
                <View style={styles.content}>
                    <Text>
                        The deck has no questions!
                    </Text>
                    <Text>
                        Add some cards to the deck so you can take a quiz
                    </Text>
                </View>
            )
        } else {
            // Quiz finished, clear reminder notification
            clearLocalNotification()
                .then(setLocalNotification)
            return (
                <View style={styles.content}>
                    <Text style={styles.finished}>
                        Finished!
                    </Text>
                    <Text style={styles.results}>
                        Your results: {corrects} correct answers!
                    </Text>
                    <View style={styles.buttons}>
                        <TouchableButton onPress={this.handleRestartQuiz}>
                            Restart quiz
                        </TouchableButton>
                        <TouchableButton onPress={() => this.props.navigation.goBack()}>
                            Back to deck
                        </TouchableButton>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    totalQuestions: { 
        textAlign: 'right',
        marginRight: 15 
    },
    content: {
        alignItems: 'center',
        marginTop: 32
    },
    question: {
        fontSize: 21
    },
    finished: {
        fontSize: 24
    },
    results: {
        fontSize: 18
    }
})

function mapStateToProps(state, ownProps) {
    const { deckId } = ownProps.navigation.state.params
    return {
        deck: state.decks[deckId]
    }
}

export default connect(mapStateToProps)(Quiz)