import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TouchableButton from './TouchableButton';

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params
    
        return {
            title: deckTitle
        }
    }
    render() {
        const { deck } = this.props
        return (
            <View style={{ alignItems: 'center' }}>
                <Text>{deck.title}</Text>
                <Text>Total questions: {deck.questions.length}</Text>
                <TouchableButton>
                    Add card
                </TouchableButton>
            </View>
        )
    }
}

function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params
    return {
        deck: state.decks[deckId]
    }
}

export default connect(mapStateToProps)(DeckView)