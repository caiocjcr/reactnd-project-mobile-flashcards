import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux' 
import { getAllDecks } from '../utils/API';
import { receiveDecks } from '../actions';
import DeckItem from './DeckItem';
import Constants from 'expo-constants'

class DeckList extends Component {
    componentDidMount() {
        getAllDecks()
            .then(res => this.props.dispatch(receiveDecks(res)))
    }
    render() {
        return (
            <View style={{ marginTop: Constants.statusBarHeight }}>
                {this.props.deckIds.map(id => (
                    <DeckItem navigation={this.props.navigation} key={id} id={id} />
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