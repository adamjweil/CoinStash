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
import LinearGradient from 'react-native-linear-gradient';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
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

  render() {
    let yday = Math.round(this.state.bitcoinYdayPrice)
    let diff = this.state.bitcoinPrice - this.state.bitcoinYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";

    const { bitcoinPrice, bitcoinYdayPrice } = this.state
    const { navigate } = this.props.navigation;
    return (
        
        <View style={styles.container}>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <Text
              style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 20}}
              onPress={() => navigate('Home')}>
              BACK
            </Text>
            <Text style={{
              flex: 1,
              fontSize: 60,
              fontWeight: 'bold',
              textAlign: 'center'
              }}>
              BTC
            </Text>
              <Text
                style={{color: 'rgba(1,1,1,0)', paddingLeft: 15, paddingRight: 15}}>
                BACK
              </Text>
          </View>

          <Text style={styles.coinPriceText}>
            {`$${this.state.bitcoinPrice}`}{'\n'}
            <Text style={styles.yDay}>Yesterday EOD: ${yday}</Text>
          </Text>

          <Text style={styles.yDayPrice}>
            <Text style={{color: colorBool}}>
                Daily Change: ${change}
            </Text>
          </Text>
          <View>
            <Text>
              BTC Feed:
            </Text>
          </View>
          <ScrollView style="">
            <TweetsComponent />
          </ScrollView>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  coinPriceText: {
    fontSize: 30,
    textAlign: 'center'
  },
  yDay: {
    fontSize: 17,
    textAlign: 'center'
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  backButtonStyle: {

  }
});


AppRegistry.registerComponent('btc', () => btc);
