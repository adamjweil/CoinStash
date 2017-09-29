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
  View,
  Button
} from 'react-native';
// var MarqueeLabel = require('@remobile/react-native-marquee-label');

export default class home extends Component {
  constructor() {
    super();
    this.state = {
      newsFeed: []
    };
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
  }

  static navigationOptions = {
    title: 'Home',
  };

  render() {

    const { bitcoinPrice } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <View style={styles.marqueeContainer}>
          <MarqueeLabel
            duration={10000}
            text={`Welcome to CoinStash!!`}
            textStyle={{ fontSize: 20, color: 'white' }} />
        </View>

        <Text style={styles.welcome}>
          CryptoNews!{'\n'}
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

        <Button title="BitCoin" onPress={() => navigate('BitCoin')} />

        </View>
    );
  }
}

const styles = StyleSheet.create({
  marqueeContainer: {
    backgroundColor: 'black',
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


AppRegistry.registerComponent('home', () => home);
