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

export default class ltc extends Component {
  constructor() {
    super();
    this.state = {
      liteCoinPrice: "",
      liteCoinYdayPrice: ""
    };
  }

  getCurrentPrice = () => {
    fetch('https://api.lionshare.capital/api/prices')
    .then(function(response) {
      return response.json()
    }).then((obj) => {
      this.setState({liteCoinPrice: obj.data.LTC[obj.data.LTC.length - 1]})
    })
  }

  getYesterdayPrice = () => {
    fetch('https://www.bitstamp.net/api/v2/ticker/ltcusd')
    .then(function(response) {
      return response.json();
    })
    .then((obj => {
      this.setState({liteCoinYdayPrice: obj.open})
    }))
  }

  componentDidMount() {
    this.getCurrentPrice()
    setInterval(this.getCurrentPrice, 100000);
    this.getYesterdayPrice()
    setInterval(this.getYesterdayPrice, 100000);

    let today = this.state.liteCoinPrice
    let yday = Math.round(this.state.liteCoinYdayPrice)
    let diff = this.state.liteCoinPrice - this.state.liteCoinYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";
  }

  // componentWillUnmount() {
  //   clearInterval()
  // }

  static navigationOptions = {
    title: 'LiteCoin',
  };

  render() {
    let today = this.state.liteCoinPrice
    let yday = Math.round(this.state.liteCoinYdayPrice)
    let diff = this.state.liteCoinPrice - this.state.liteCoinYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";

    const { bitcoinPrice } = this.state
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
            }}>LTC</Text>
          </View>

          <Text style={{fontSize: 30}}>{`$${this.state.liteCoinPrice}`}{'\n'}<Text
            style={styles.yDay}>Yesterday EOD: ${this.state.liteCoinYdayPrice}</Text>
          </Text>

            <Text style={styles.yDayPrice}>
              <Text style={{color: colorBool}}>
                  Daily Change: ${change}
              </Text>
            </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  marqeeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  marqueeLabel: {
    marginBottom: 100,
    backgroundColor: 'blue',
    width:400,
    height:50,
  },
  header: {
    backgroundColor: 'blue'
  },
  yDay: {
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
});


AppRegistry.registerComponent('ltc', () => ltc);
