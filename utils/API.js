import { AsyncStorage } from 'react-native'

export const getAllDecks = () => new Promise((resolve, reject) => {
	AsyncStorage.getItem('decks')
		.then(decks => resolve(JSON.parse(decks)))
		.catch(() => reject())
})

export const addNewDeck = (newDeck) => {
	return AsyncStorage.mergeItem('decks', JSON.stringify({[newDeck.id]: newDeck}))
}

export const addQuestionToDeck = (deckId, question) => {
	AsyncStorage.getItem('decks')
		.then(res => {
			const decks = JSON.parse(res)
			decks[deckId].questions.push(question)
			AsyncStorage.setItem('decks', JSON.stringify(decks))
		})
}