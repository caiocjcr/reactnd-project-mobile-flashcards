import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { generateUID } from '../utils/helpers'
import { addNewDeck } from '../utils/API'

class NewDeck extends Component {
    state = {
        deckName: ''
    }

    submitDeck = () => {
        const deck = {
            title: this.state.deckName,
            id: generateUID()
        }
        this.props.dispatch(addDeck(deck))
        addNewDeck(deck)
    }

    render() {
        const { deckName } = this.state
        return (
            <View style={styles.root}>
                <Text>New deck name:</Text>
                <TextInput value={deckName} onChangeText={text => this.setState({deckName: text})} style={styles.textInput}/>
                <Button title='Submit' onPress={this.submitDeck}/>
            </View>
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

export default connect()(NewDeck)