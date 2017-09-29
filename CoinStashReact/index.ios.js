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
// import  NewsFeed  from './NavComponent/NewsFeed'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
// var MarqueeLabel = require('@remobile/react-native-marquee-label');

export default class CoinStashReact extends Component {
  constructor() {
    super();
    console.log("hi")
    this.state = {
      newsFeed: [],
      bitcoinPrice: "",
      bitcoinYdayPrice: "",
      ethereumPrice: "",
      ethereumYdayPrice: "",
      liteCoinPrice: "",
      liteCoinYdayPrice: ""
    };
  }

  getCurrentPrice = () => {
    // console.log("hi")
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

  getCurrentNews = () => {
    fetch('https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=ed62d0aea575414fbdf6a1351c0fa66a')
    .then(function(response) {
      return response.json();
      // console.log(response[0]);
    }).catch((error) => console.warn("fetch error:", error))
    .then((response) => {
      console.log(response.articles[0]);
      this.setState({newsFeed: response.articles[response.articles.length - 1]})
    })
  }

  componentDidMount() {
    this.getCurrentNews();
    setInterval(this.getCurrentNews, 10000);
    this.getCurrentPrice();
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

  render() {
    // debugger
    const { bitcoinPrice } = this.state

    return (
      <View style={styles.container}>

        <View style={styles.marqueeContainer}>
          <MarqueeLabel
            duration={5000}
            text={`Bitcoin: $${this.state.bitcoinPrice}  |  Ethereum: $${this.state.ethereumPrice}  |  LiteCoin: $${this.state.liteCoinPrice}`}
            textStyle={{ fontSize: 20, color: 'white' }} />
        </View>

        <Text style={styles.welcome}>
          Welcome to CoinStash!{'\n'}
        </Text>

        <Text style={styles.newsTitle}>
          {this.state.newsFeed.title}
        </Text>

          <Text style={styles.newsAuthor}>
            posted by.. {this.state.newsFeed.author}
          </Text>

        <Text style={styles.newsDescription}>
          {this.state.newsFeed.description}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  marqeeContainer: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      marginTop: 10,
      backgroundColor: 'blue',
      color: 'blue'
  },
  marqueeContainer: {
    backgroundColor: 'blue',
    height: 50,
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
      marginTop: 10,
      backgroundColor: 'blue',
      width:400,
      height:50,
      fontWeight:'900',
    },
    header: {
      backgroundColor: 'blue'
    },
    newsTitle: {
      fontSize: 15,
      color: '#333333',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    newsDescription: {
      fontSize: 12,
      color: '#333333',
      textAlign: 'left',
      fontWeight: '300',
      fontStyle: 'italic',
    },
    newsAuthor: {
      fontSize: 8,
      color: '#333333',
      textAlign: 'center',
    }
});

AppRegistry.registerComponent('CoinStashReact', () => CoinStashReact);
