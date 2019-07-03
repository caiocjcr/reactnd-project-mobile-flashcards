import { AsyncStorage } from 'react-native'

export const getAllDecks = () => new Promise((resolve, reject) => {
	AsyncStorage.getItem('decks')
        .then(decks => resolve(JSON.parse(decks)))
        .catch(() => reject())
})

export const addNewDeck = (newDeck) => {
	return AsyncStorage.mergeItem('decks', JSON.stringify({[newDeck.id]: newDeck}))
}