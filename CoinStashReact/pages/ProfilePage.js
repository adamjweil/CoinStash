
'use strict';
import React, { Component } from 'react';

import { StackNavigator} from 'react-navigation';
import { BackToHomeBTN } from '../NavComponent/BackToHomeBTN';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      primaryCoinName: "",
      primaryCoinBalance: "",
      usdName: "",
      usdBalance: ""
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/coinbases/accounts')
    .then(function(response) {
      return response.json();
    }).then((obj) => {
      console.log(obj)
      let balance = obj[0].balance.amount
      let name = obj[0].name
      this.setState({primaryCoinBalance: balance})
      this.setState({primaryCoinName: name})

      // console.log(name)
    })
  }

  static navigationOptions = {
    title: 'Profile Page',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View  style={styles.title}>
          <Text>{'\n'}{'\n'}Profile Page</Text>
          <Text>Primary Account Name: {this.state.primaryName}{'\n'}</Text>
          <Text>Balance: {this.state.primaryBalance}</Text>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default ProfilePage;
