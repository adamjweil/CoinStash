
'use strict';
import React, { Component } from 'react';

import { StackNavigator} from 'react-navigation';
import  { BackToHomeBTN }  from '../NavComponent/BackToHomeBTN';
import { Button, ButtonGroup, FormLabel, FormInput } from 'react-native-elements';
import Transactions from './Transactions';

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
      ltcName: "",
      ltcBal: "",
      ltcCCY: "",
      usdName: "",
      usdBal: "",
      usdCCY: "",
      btcName: "",
      btcBal: "",
      btcCCY: "",
      ethName: "",
      ethBal: "",
      ethCCY: ""
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/coinbases/usdwallet')
    .then(function(response) {
      return response.json();
    }).then((obj) => {
      let usdN = obj.name
      let usdB = obj.balance.amount
      let usdC = obj.balance.currency
    this.setState({usdName: usdN, usdBal: usdB, usdCCY: usdC})
  })
    fetch('http://localhost:3000/coinbases/btcwallet')
    .then(function(response) {
      return response.json();
    }).then((obj) => {
        let btcB = obj.balance.amount
        let btcN = obj.name
        let btcC = obj.balance.currency
      this.setState({btcName: btcN, btcBal: btcB, btcCCY: btcC})
  })
  fetch('http://localhost:3000/coinbases/ethwallet')
  .then(function(response) {
    return response.json();
  }).then((obj) => {
      let ethB = obj.balance.amount
      let ethN = obj.name
      let ethC = obj.balance.currency
    this.setState({ethName: ethN, ethBal: ethB, ethCCY: ethC})
  })
  fetch('http://localhost:3000/coinbases/ltcwallet')
  .then(function(response) {
    return response.json();
  }).then((obj) => {
      let ltcB = obj.balance.amount
      let ltcN = obj.name
      let ltcC = obj.balance.currency
    this.setState({ltcName: ltcN, ltcBal: ltcB, ltcCCY: ltcC})
  })

}


  static navigationOptions = {
    title: 'Profile Page',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (

      <ScrollView style={styles.scrollView}>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <BackToHomeBTN navigate={navigate} />
            <Text
              style={{color: 'rgba(1,1,1,0)', paddingLeft: 15, paddingRight: 15}}>
              BACK
            </Text>
        </View>
        <View>
          <Text style={styles.title}>{'\n'}{'\n'}Profile Page</Text>
        </View>

        <View style={styles.accouontInfo}>
          <Text style={styles.accountName}>Account Name: {this.state.usdName}{'\n'}</Text>
          <Text>Balance: {this.state.usdBal}{'\n'}</Text>
          <Text style={styles.currency}>Currency: {this.state.usdCCY}</Text>
        </View>

        <View style={styles.accouontInfo}>
          <Text style={styles.accountName}>Account Name: {this.state.btcName}{'\n'}</Text>
          <Text>Balance: {this.state.btcBal}{'\n'}</Text>
          <Text style={styles.currency}>Currency: {this.state.btcCCY}{'\n'}</Text>
        </View>

        <View style={styles.accouontInfo}>
          <Text style={styles.accountName}>Account Name: {this.state.ethName}{'\n'}</Text>
          <Text>Balance: {this.state.ethBal}{'\n'}</Text>
          <Text style={styles.currency}>Currency: {this.state.ethCCY}{'\n'}</Text>
        </View>

        <View style={styles.accouontInfo}>
          <Text style={styles.accountName}>Account Name: {this.state.ltcName}{'\n'}</Text>
          <Text>Balance: {this.state.ltcBal}{'\n'}</Text>
          <Text style={styles.currency}>Currency: {this.state.ltcCCY}{'\n'}</Text>
        </View>

      <Transactions />
    </ScrollView>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  accouontInfo: {
    // alignItems: 'left',
    padding: 10,
    marginBottom: 10,
    width: 300,
    height: 130,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: '#F8F8F8'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  accountName: {
    fontWeight: 'bold',
  },
  currency: {
    fontWeight: '200'
  }
});

export default ProfilePage;
