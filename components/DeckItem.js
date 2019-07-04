import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckItem extends Component {
    handleDeckPress = () => {
        this.props.navigation.navigate('DeckView', { deckId: this.props.deck.id, deckTitle: this.props.deck.title })
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handleDeckPress} style={styles.item}>
                <Text>
                    {this.props.deck.title}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        borderWidth: 1,
        padding: 5,
        width: '100%',
        height: 40,
        justifyContent: 'center'
    }
})

function mapStateToProps(state, ownProps) {
    if (state.decks[ownProps.id]) {
        return {
            deck: state.decks[ownProps.id]
        }
    } else {
        return {
            deck: null
        }
    }
}

export default connect(mapStateToProps)(DeckItem)