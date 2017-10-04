
'use strict';
import React, { Component } from 'react';

import { StackNavigator} from 'react-navigation';
import  { BackToHomeBTN }  from '../NavComponent/BackToHomeBTN';
import { ButtonGroup, FormLabel, FormInput } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Transactions from './Transactions';
import Button from 'apsl-react-native-button'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
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
      ethCCY: "",
    };
  }
  showTransactions() {
    return(
      <View>
        <Transactions />
      </View>
    );
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
    fetch('http://localhost:3000/coinbases/accounts')
    .then(function(response) {
      return response.json();
    }).then((obj) => {
      console.log(obj)
        let btcB = obj[3].balance.amount
        let btcN = obj[3].name
        let btcC = obj[3].balance.currency
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
      <LinearGradient colors={['#43cea2', '#185a9d']} style={styles.linearGradient}>
        <Image source={{uri: 'http://www.freepngimg.com/thumb/mustache/5-2-no-shave-movember-day-mustache-png-image-thumb.png'}}
          style={{width: 125, height: 50, marginLeft: 120, marginBottom: -75}}
          />
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <BackToHomeBTN navigate={navigate} />
            <Text
              style={{color: 'rgba(1,1,1,0)', paddingLeft: 15, paddingRight: 15}}>
              BACK
            </Text>
            <View>
              <Text style={styles.title}>{'\n'}{'\n'}Profile Page</Text>
            </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View>
            <View style={styles.accountWrapper}>
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
            </View>
          </View>

          <View>
            <Button style={styles.transactionButton}
                    onPress={() => this.showTransactions}>
                    <Text>Transactions</Text>
            </Button>
            <Transactions />
          </View>

    </ScrollView>
  </LinearGradient>
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
    width: 350,
    height: 120,
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
  },
  accountWrapper: {
    alignItems: 'center'
  },
  transactionButton: {
    backgroundColor: 'orange',
    borderRadius: 5,
    borderWidth: 2,
    width: 300,
    marginLeft: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  transactionButtonFont: {
    fontSize:18,
  }
});

export default ProfilePage;
