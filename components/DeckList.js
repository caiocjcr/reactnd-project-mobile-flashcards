import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux' 
import { getAllDecks } from '../utils/API';
import { receiveDecks } from '../actions';

class DeckList extends Component {
    componentDidMount() {
        getAllDecks()
            .then(res => this.props.dispatch(receiveDecks(res)))
    }
    render() {
        return (
            <View>
                {this.props.deckIds.map(id => (
                    <View key={id}>
                        <Text>{id}</Text>
                    </View>
                ))}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        deckIds: Object.keys(state.decks)
    }
}

export default connect(mapStateToProps)(DeckList)