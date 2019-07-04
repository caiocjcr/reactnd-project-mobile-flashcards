import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

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
            <View>
                <Text>{deck.title}</Text>
                <Text>Total questions: {deck.questions.length}</Text>
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