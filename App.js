import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import People from './components/People'
import Container from './Container'


const links = [
  { title: 'People' },
  { title: 'Films' },
  { title: 'StarShips' },
  { title: 'Vehicles' },
  { title: 'Species' },
  { title: 'Planets' }
]


const App = createStackNavigator({    
  StarWars: {
    screen: StarWars    
  },
  People: {
    screen: People    
  }
})
export default App