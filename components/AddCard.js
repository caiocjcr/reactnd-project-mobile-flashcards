import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TouchableButton from './TouchableButton'
import { addQuestion } from '../actions'
import { addQuestionToDeck } from '../utils/API';

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    handleAddCardPress = () => {
        const { deckId } = this.props.navigation.state.params
        const { question, answer } = this.state

        this.props.dispatch(addQuestion(deckId, { question, answer }))
        addQuestionToDeck(deckId, {question, answer})
        this.setState({
            question: '',
            answer: ''
        })
        this.props.navigation.goBack()
    }

    render() {
        const { question, answer } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.root}>
                <Text>Question:</Text>
                <TextInput value={question} onChangeText={text => this.setState({question: text})} style={styles.textInput}/>
                <Text>Answer:</Text>
                <TextInput value={answer} onChangeText={text => this.setState({answer: text})} style={styles.textInput}/>
                <TouchableButton onPress={this.handleAddCardPress}>
                    Add card
                </TouchableButton>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        marginTop: 5,
        borderColor: '#eee',
        borderRadius: 5,
        borderWidth: 1,
        width: 200,
        height: 40
    }
})

export default connect()(AddCard)