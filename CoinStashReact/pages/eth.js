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
import RSSFeed from '../NavComponent/RSSFeed'
import TopNewsMarquee from '../NavComponent/TopNewsMarquee'
import EthereumTweets from '../NavComponent/EthereumTweets'


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

export default class eth extends Component {
  constructor() {
    super();
    this.state = {
      ethereumPrice: "",
      ethereumYdayPrice: ""
    };
  }

  getCurrentPrice = () => {
    fetch('https://api.lionshare.capital/api/prices')
    .then(function(response) {
      return response.json()
    })
    .then((obj) => {
      this.setState({ethereumPrice: obj.data.ETH[obj.data.ETH.length - 1]})
    })
  }

  getYesterdayPrice = () => {
    fetch('https://www.bitstamp.net/api/v2/ticker/ethusd')
    .then(function(response) {
      return response.json();
    })
    .then((obj => {
      this.setState({ethereumYdayPrice: obj.open})
    }))
  }
  componentDidMount() {
    this.getCurrentPrice()
    setInterval(this.getCurrentPrice, 100000);
    this.getYesterdayPrice()
    setInterval(this.getYesterdayPrice, 100000);

    let today = this.state.ethereumPrice
    let yday = Math.round(this.state.ethereumYdayPrice)
    let diff = this.state.ethereumPrice - this.state.ethereumYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";

  }

  // componentWillUnmount() {
  //   clearInterval()
  // }

  static navigationOptions = {
    title: 'Ethereum',
  };

  render() {
    let yday = Math.round(this.state.ethereumYdayPrice)
    let diff = this.state.ethereumPrice - this.state.ethereumYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";

    const { bitcoinPrice } = this.state
    return (

    <ScrollView style={styles.scrollView}>
      <TopNewsMarquee />
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
            }}>ETH</Text>
          </View>

          <Text style={{fontSize: 30}}>{`$${this.state.ethereumPrice}`}{'\n'}<Text
            style={styles.yDay}>Yesterday EOD: ${this.state.ethereumYdayPrice}</Text>
          </Text>

            <Text style={styles.yDayPrice}>
              <Text style={{color: colorBool}}>
                  Daily Change: ${change}
              </Text>
            </Text>
          <RSSFeed />
          <View>
            <Text>
              Ethereum Tweets
            </Text>
          </View>
          <EthereumTweets />
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
  header: {
    backgroundColor: 'blue'
  },
  yDay: {
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  ScrollView: {

  }
});


AppRegistry.registerComponent('eth', () => eth);
