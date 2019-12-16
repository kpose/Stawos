import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, } from 'react-native'
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

      state = {
        data: [],
        loading: true
      }

      componentDidMount() {
        fetch('https://swapi.co/api/films/')
          .then(res => res.json())
          .then(json => this.setState({ data: json.results, loading: false }))
          .catch((err) => console.log('err:', err))
      }

    renderItem = ({ item }) => {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.info}>Description: {item.opening_crawl}</Text>
            <Text style={styles.info}>Producers: {item.producer}</Text>
            <Text style={styles.info}>Release Date: {item.release_date}</Text>
            
          </View>
        )
      }

  render() {
    let { data } = this.state
    return (
        <Container>
        {
          this.state.loading ? <ActivityIndicator color='#ffe81f' /> : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.title}
              renderItem={this.renderItem}
            />
          )
        }
      </Container>
    )
  }
}

const styles = StyleSheet.create({
    pickerToggleContainer: {
      padding: 25,
      justifyContent: 'center',
      alignItems: 'center'
    },
    pickerToggle: {
      color: '#EE3D2B',
      fontSize:16,
      fontWeight: 'bold'
    },
    pickerContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0
    },
    itemContainer: {
      padding: 15,
      borderBottomWidth: 1, borderBottomColor: '#ffe81f'
    },
    name: {
      color: '#ffe81f',
      fontSize: 18
    },
    info: {
      color: '#ffe81f',
      fontSize: 14,
      marginTop: 5
    },
    hwinfo: {
      color: '#EE3D2B',
      fontSize: 13,
      marginTop: 5,
      fontWeight: 'bold'
    }
  });