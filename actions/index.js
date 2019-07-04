export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

// Get decks from the AsyncStorage
export const receiveDecks = decks => ({
    type: RECEIVE_DECKS,
    decks
})

// Insert a new deck into the store (doesn't add to the AsyncStorage)
export const addDeck = deck => ({
    type: ADD_DECK,
    deck
})

export const addQuestion = (deckId, question) => ({
    type: ADD_QUESTION,
    question,
    deckId
})