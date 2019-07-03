import React from 'react'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'

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
      <MainNavigation />
    )
  }
}