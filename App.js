import React from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'

// Function source: Udacity's React nanodegree - Redux course
const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('The action: ', action)
    const result = next(action)
    console.log('The new state: ', store.getState())
  console.groupEnd()
  return result
}

const store = createStore(reducers, applyMiddleware(logger))

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Your decks',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards' size={30} style={{ color: tintColor }}/>
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New deck',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-create' size={30} style={{ color: tintColor }}/>
    }
  }
})

const MainStackNavigation = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  }
})

const MainNavigation = createAppContainer(MainStackNavigation)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ height: Constants.statusBarHeight }}>
          <StatusBar />
        </View>
        <MainNavigation />
      </Provider>
    )
  }
}