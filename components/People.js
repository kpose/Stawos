import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, ActivityIndicator, FlatList, Modal, Picker } from 'react-native'
import Container from '../Container'
import HomeWorld from './Homeworld'



export default class People extends Component {
  static navigationOptions = {
    headerTitle: 'People',
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
    loading: true,
    modalVisible: false,
    gender: 'all',
    pickerVisible: false
  }
  componentDidMount() {
    fetch('https://swapi.co/api/people/')
      .then(res => res.json())
      .then(json => this.setState({ data: json.results, loading: false }))
      .catch((err) => console.log('err:', err))
  }

  openHomeWorld = (url) => {
    this.setState({
      url,
      modalVisible: true
    })
  }

  closeModal = () => {
    this.setState({ modalVisible: false })
  }

  togglePicker = () => {
    this.setState({ pickerVisible: !this.state.pickerVisible })
  }

  filter = (gender) => {
    this.setState({ gender })
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.info}>Height: {item.height}</Text>
        <Text style={styles.info}>Birth Year: {item.birth_year}</Text>
        <Text style={styles.info}>Gender: {item.gender}</Text>
        <TouchableHighlight style={styles.button} onPress={() => this.openHomeWorld(item.homeworld)}>
          <Text style={styles.hwinfo}>VIEW HOME-WORLD</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    let { data } = this.state
    if (this.state.gender !== 'all') {
      data = data.filter(f => f.gender === this.state.gender)
    }

    return (
      <Container>
        <TouchableHighlight style={styles.pickerToggleContainer} onPress={this.togglePicker}>
          <Text style={styles.pickerToggle}>{this.state.pickerVisible ? 'Close Filter' : 'Open Filter'}</Text>
        </TouchableHighlight>
        {
          this.state.loading ? <ActivityIndicator color='#ffe81f' /> : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.name}
              renderItem={this.renderItem}
            />
          )
        }
        <Modal
          onRequestClose={() => console.log('onrequest close called')}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <HomeWorld closeModal={this.closeModal} url={this.state.url} />
        </Modal>
        {
          this.state.pickerVisible && (
            <View style={styles.pickerContainer}>
              <Picker
                style={{ backgroundColor: '#EE3D2B' }}
                selectedValue={this.state.gender}
                onValueChange={(item) => this.filter(item)}>

                <Picker.Item itemStyle={{ color: 'yellow' }} label="All" value="all" />
                <Picker.Item label="Males" value="male" />
                <Picker.Item label="Females" value="female" />
                <Picker.Item label="Others" value="n/a" />
              </Picker>
            </View>
          )
        }
      </Container>
    );
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