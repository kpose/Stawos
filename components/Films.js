import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import Container from '../Container'

export default class Films extends Component {
    static navigationOptions = {
        headerTitle: 'Films',
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: '#ffe81f',
          backgroundColor: 'black'
        },
        pressColorAndroid: 'white',
        headerTintColor: '#ffe81f'
      }

    constructor(props) {
        super(props)
        this.state = {
            films: []
        };
    }

    componentDidMount(){
        fetch("https://swapi.co/api/films/")
        .then(response => response.json())
        .then((responseJson)=> {
            this.setState({
            films: responseJson
            })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

  render() {
    return (
        <Container>
      <View>
        <Text> textInComponent </Text>
      </View>
      </Container>
    )
  }
}
