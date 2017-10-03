/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

'use strict';
import React, { Component } from 'react';

import { Header } from 'react-native-elements';
import TweetsComponent from '../NavComponent/TweetsComponent';
import BitCoinTweets from '../NavComponent/BitCoinTweets';
import { Button, ButtonGroup, FormLabel, FormInput } from 'react-native-elements';
import { StackNavigator} from 'react-navigation';
import buyBTCForm from './forms/buyBTCForm';
import sellBTCForm from './forms/sellBTCForm';
import { BackToHomeBTN } from '../NavComponent/BackToHomeBTN';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

class btc extends Component {
  constructor() {
    super();
    this.state = {
      bitcoinPrice: "",
      bitcoinYdayPrice: "",
      selectedIndex: 3,
      prevPriceString: "",
      prevPriceNum: ""
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    if (this.state.selectedIndex === 0){
      this.setState({prevPriceString: "Daily Change: "})
        fetch('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
            let o = JSON.stringify(obj.bpi)
            let split = o.split(":")
            let yDay = split[1]
            let choppedYdayPrice = yDay.substring(0, yDay.length - 1);
            let now = this.state.bitcoinPrice;
            let diff = now - choppedYdayPrice;
            let diffRounded = diff.toFixed(2)
          this.setState({prevPriceNum: diffRounded})
        })
    }
    else if (this.state.selectedIndex === 1) {
      this.setState({prevPriceString: "Weekly Change: "})
        fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let day = getDate() - 7
          let mon = getMonth();
          let year = getFullYear();
          if (mon < 10) {mon="0"+mon}
          if (day < 10) {day="0"+day}
          let m = year + "-" + mon + "-" + day
          // console.log(m)
          // debugger
          // console.log(m)
          // var length = obj.bpi.length - 7;
          // let o = JSON.stringify(obj.bpi)
          // console.log(length)
          // console.log(obj.bpi[length])
          // var weekAgo = length - 7;
          // d.setDate(d.getDate() - 7);
          // console.log(d)
          // console.log(obj.bpi[weekAgo])
        })
    }
    else if (this.state.selectedIndex === 2) {
      this.setState({prevPriceString: "Monthly Change: "})
      fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        // Need to work on
      })
    }
    else if (this.state.selectedIndex === 3) {
      this.setState({prevPriceString: "Yealy Change: "})
    }
  }

  getCurrentPrice = () => {
    fetch('https://api.lionshare.capital/api/prices')
    .then(function(response) {
      return response.json()
    })
    .then((obj) => {
      this.setState({bitcoinPrice: obj.data.BTC[obj.data.BTC.length - 1]})
    })
  }

  getYesterdayPrice = () => {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday')
    .then(function(response) {
      return response.json();
    })
    .then((obj) => {
      let o = JSON.stringify(obj.bpi)
      let split = o.split(":")
      let yDay = split[1]
      let choppedYdayPrice = yDay.substring(0, yDay.length - 1);

      this.setState({bitcoinYdayPrice: choppedYdayPrice})
    })
  }

  componentDidMount() {
    this.getCurrentPrice()
    setInterval(this.getCurrentPrice, 10000);
    this.getYesterdayPrice()
    setInterval(this.getYesterdayPrice, 10000);

    let today = this.state.bitcoinPrice
    let yday = Math.round(this.state.bitcoinYdayPrice)
    let diff = this.state.bitcoinPrice - this.state.bitcoinYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";

  }

  // componentWillUnmount() {
  //   clearInterval()
  // }
  static navigationOptions = {
    header: null,
    title: 'BTC'
  }

  render() {
    let yday = Math.round(this.state.bitcoinYdayPrice)
    let diff = this.state.bitcoinPrice - this.state.bitcoinYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";

    const { bitcoinPrice, bitcoinYdayPrice } = this.state
    const { navigate } = this.props.navigation;
    const buttons = ['Daily', 'Weekly', 'Monthly', 'Yearly']
    const { selectedIndex } = this.state

    return (

      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <BackToHomeBTN navigate={navigate} />
          <Text style={styles.coinPriceTitle}>BTC</Text>
          <Text
            style={{color: 'rgba(1,1,1,0)', paddingLeft: 15, paddingRight: 15}}>
            BACK
          </Text>
        </View>

        <Text style={styles.coinPriceText}>
          {`$${this.state.bitcoinPrice}`}
        </Text>

        <Text style={styles.yDayPrice}>
          <Text style={{color: colorBool}}>
            {this.state.prevPriceString} {`$${this.state.prevPriceNum}`}
          </Text>
        </Text>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 50}}
         />

        <Text style={{fontSize: 20, paddingTop: 15, paddingBottom: 5}}>
          BTC Feed:
        </Text>

        <ScrollView>
          <BitCoinTweets />
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Button
            raised
            buttonStyle={{backgroundColor: '#185A9D', borderRadius: 2, marginTop: 10, marginLeft: 15, width: 200}}
            textStyle={{textAlign: 'center'}}
            title={`BUY`}
            onPress={()=> navigate('buyBTCForm')}
            />
          <Button
            raised
            buttonStyle={{backgroundColor: '#185A9D', borderRadius: 2, marginTop: 10, marginRight: 15, width: 200}}
            textStyle={{textAlign: 'center'}}
            title={`SELL`}
            onPress={()=> navigate('sellBTCForm')}
            />
        </View>
      </View>
    );
  }
}

const btcNav = StackNavigator({
  selfBTC: {
    screen: btc
  },
  buyBTCForm: {
    screen: buyBTCForm,
    navigationOptions: {
      title: 'Buy BTC',
      headerBackTitle: 'BTC'
    }
  },
  sellBTCForm: {
    screen: sellBTCForm,
    navigationOptions: {
      title: 'Sell BTC',
      headerBackTitle: 'BTC'
    }
  }
},
{
  initialRouteName: 'selfBTC'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  coinPriceTitle: {
    flex: 1,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  coinPriceText: {
    fontSize: 30,
    textAlign: 'center'
  },
  yDay: {
    fontSize: 17,
    textAlign: 'center'
  }
});

export default btcNav;
