import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux' 
import { getAllDecks } from '../utils/API';
import { receiveDecks } from '../actions';
import DeckItem from './DeckItem';

class DeckList extends Component {
    componentDidMount() {
        getAllDecks()
            .then(res => this.props.dispatch(receiveDecks(res)))
    }
    render() {
        return (
            <View>
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