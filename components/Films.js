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
            <Text style={styles.info2}>DESCRIPTION: <Text style={styles.info}> {item.opening_crawl} </Text> </Text>
            <Text style={styles.info2}>PRODUCERS: <Text style={styles.info}> {item.producer} </Text> </Text>
            <Text style={styles.info2}>RELEASE DATE: <Text style={styles.info}> {item.release_date} </Text></Text>
            
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
    itemContainer: {
      padding: 15,
      borderBottomWidth: 1, borderBottomColor: '#ffe81f'
    },
    name: {
      color: '#EE3D2B',
      fontSize: 20,
      fontWeight: 'bold'
    },
    info: {
      color: '#ffffff',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 5
    },
    info2: {
      color: '#ffe81f',
      fontSize: 13,
      marginTop: 5,
      fontWeight: 'bold'
    }
  });