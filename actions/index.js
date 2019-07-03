export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'

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