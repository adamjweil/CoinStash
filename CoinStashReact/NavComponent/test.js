/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import MarqueeLabel, from '/NativeComponent/MarqeeLabel.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
var MarqueeLabel = require('@remobile/react-native-marquee-label');

export default class CoinStashReact extends Component {
  constructor() {
    super();
    console.log("hi")
    this.state = {
      bitcoinPrice: "",
      ethereumPrice: "",
      liteCoinPrice: ""
    };
  }

  // window.setInterval(componentDidMount(), 1000);

  componentDidMount() {
    // This is an API we used to get access to bitcoin prices
    // fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    fetch('https://api.lionshare.capital/api/prices')
    .then(function(response) {
      // debugger
      return response.json()
    }).then((obj) => {
      console.log(obj.data.BTC.length)
      console.log(obj.data.ETH.length)
      console.log(obj.data.LTC.length)
      this.setState({bitcoinPrice: obj.data.BTC[obj.data.BTC.length - 1],
                    ethereumPrice: obj.data.ETH[obj.data.ETH.length - 1],
                    liteCoinPrice: obj.data.LTC[obj.data.LTC.length - 1]})

    })
  }

  render() {
    // debugger
    const { bitcoinPrice } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to CoinStash!

          Current Price of Bitcoin: ${this.state.bitcoinPrice}{'\n'}
          Current Price of LiteCoin: ${this.state.liteCoinPrice}{'\n'}




        </Text>


        <MarqueeLabel style={styles.marqueeLabel}
            scrollDuration={3.0} text="Hey"
            ><Text>Xyz</Text>
            fangyunjiang is a good developer
        </MarqueeLabel>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
      // fontSize:12,
      // fontWeight:'800',
      // color:'white',
    }
});

AppRegistry.registerComponent('CoinStashReact', () => CoinStashReact);
