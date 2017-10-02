/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
import React, { Component } from 'react';

import MarqueeLabelVertical from 'react-native-lahk-marquee-label-vertical';
import MarqueeLabel from 'react-native-lahk-marquee-label';
import { Header } from 'react-native-elements';
import TweetsComponent from '../NavComponent/TweetsComponent';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class btc extends Component {
  constructor() {
    super();
    console.log("hi")
    this.state = {
      bitcoinPrice: "",
      bitcoinYdayPrice: ""
    };
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
    title: 'BitCoin',
  };

  render() {
    let yday = Math.round(this.state.bitcoinYdayPrice)
    let diff = this.state.bitcoinPrice - this.state.bitcoinYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";

    const { bitcoinPrice, bitcoinYdayPrice } = this.state
    return (
      <View style={styles.container}>
        <View style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'flex-start',
          }}>
          <Text style={{
            fontSize: 60,
            fontWeight: 'bold',
            justifyContent: 'center'
          }}>
            BTC
          </Text>
        </View>

        <Text style={{ fontSize: 30 }}>{`$${this.state.bitcoinPrice}`}{'\n'}<Text style={styles.yDay}>Yesterday EOD: ${yday} </Text>
        </Text>

        <Text style={styles.yDayPrice}>
          <Text style={{color: colorBool}}>
              Daily Change: ${change}
          </Text>
        </Text>
        <TweetsComponent />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  marqeeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 50
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  marqueeLabel: {
    marginTop: 10,
    backgroundColor: 'blue',
    width:400,
    height:50,
    fontWeight:'900'
  },
  header: {
    backgroundColor: 'blue'
  },
  yDay: {
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
});


AppRegistry.registerComponent('btc', () => btc);
