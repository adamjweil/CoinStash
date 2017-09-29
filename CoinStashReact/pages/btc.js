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

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
// var MarqueeLabel = require('@remobile/react-native-marquee-label');

export default class btc extends Component {
  constructor() {
    super();
    console.log("hi")
    this.state = {
      bitcoinPrice: "",
      bitcoinYdayPrice: "",
      ethereumPrice: "",
      ethereumYdayPrice: "",
      liteCoinPrice: "",
      liteCoinYdayPrice: ""
    };
  }

  getCurrentPrice = () => {
    fetch('https://api.lionshare.capital/api/prices')
    .then(function(response) {
      // debugger
      return response.json()
    }).then((obj) => {
      this.setState({bitcoinPrice: obj.data.BTC[obj.data.BTC.length - 1],
                    ethereumPrice: obj.data.ETH[obj.data.ETH.length - 1],
                    liteCoinPrice: obj.data.LTC[obj.data.LTC.length - 1]})
                  })
  }
  componentDidMount() {
    this.getCurrentPrice()
    setInterval(this.getCurrentPrice, 100000);

    // Yesterday's Bitcoin Price
    // fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    // .then(function(response) {
    //   return response.json()
    // }).then((obj) => {
    //   console.log(JSON.parse(obj))
    //   this.setState({bitcoinYdayPrice: obj.data})
    // });
  }

  // componentWillUnmount() {
  //   clearInterval()
  // }

  static navigationOptions = {
    title: 'BitCoin',
  };

  render() {

    const { bitcoinPrice } = this.state
    return (
      <View style={styles.marqueeContainer}>
        <MarqueeLabel
          duration={5000}
          text={`Bitcoin: $${this.state.bitcoinPrice}  |  Ethereum: $${this.state.ethereumPrice}  |  LiteCoin: $${this.state.liteCoinPrice}`}
          textStyle={{ fontSize: 20, color: 'white' }} />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  marqueeContainer: {
    backgroundColor: 'blue',
    height: 50,
  },
  marqueeLabel: {
    marginTop: 10,
    backgroundColor: 'blue',
    width:400,
    height:50,
    fontWeight:'900',
  },
});


AppRegistry.registerComponent('btc', () => btc);
