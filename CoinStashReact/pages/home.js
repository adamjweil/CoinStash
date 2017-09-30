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
  Image,
  Button,
  ScrollView
} from 'react-native';
// var MarqueeLabel = require('@remobile/react-native-marquee-label');

export default class home extends Component {
  constructor() {
    super();
    this.state = {
      newsFeed0: [],
      newsFeed1: [],
      newsFeed2: [],
      newsFeed3: [],
      newsFeed4: [],
      newsFeed5: [],
      newsFeed6: [],
      newsFeed7: [],
      newsFeed8: []
    };
  }
  getCurrentPrice = () => {
    fetch('https://api.lionshare.capital/api/prices')
    .then(function(response) {
      // debugger
      return response.json()
    }).then((obj) => {
      this.setState({
        bitcoinPrice: obj.data.BTC[obj.data.BTC.length - 1],
        ethereumPrice: obj.data.ETH[obj.data.ETH.length - 1],
        liteCoinPrice: obj.data.LTC[obj.data.LTC.length - 1]})
    })
  }

  getCurrentNews = () => {
    // TechCrunch
    // fetch('https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=ed62d0aea575414fbdf6a1351c0fa66a')
    fetch('https://newsapi.org/v1/articles?source=hacker-news&sortBy=latest&apiKey=ed62d0aea575414fbdf6a1351c0fa66a')
    .then(function(response) {
      return response.json();
      // console.log(response[0]);
    }).catch((error) => console.warn("fetch error:", error))
    .then((response) => {
      console.log(response.articles);
      console.log(response.articles[2].urlToImage);

      this.setState({newsFeed0: response.articles[response.articles.length - 1]})
      this.setState({newsFeed1: response.articles[response.articles.length - 2]})
      this.setState({newsFeed2: response.articles[response.articles.length - 3]})
      this.setState({newsFeed3: response.articles[response.articles.length - 4]})
      this.setState({newsFeed4: response.articles[response.articles.length - 5]})
      this.setState({newsFeed5: response.articles[response.articles.length - 6]})
      this.setState({newsFeed6: response.articles[response.articles.length - 7]})
      this.setState({newsFeed7: response.articles[response.articles.length - 8]})
      this.setState({newsFeed8: response.articles[response.articles.length - 9]})
    })
  }

  componentDidMount() {
    this.getCurrentNews();
    setInterval(this.getCurrentNews, 10000);
    this.getCurrentPrice();
    setInterval(this.getCurrentPrice, 10000);
  }

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { bitcoinPrice } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              title={`Bitcoin:\n $${this.state.bitcoinPrice}`}
              onPress={() => navigate('BitCoin')}>
            </Button>
            <View style={{marginHorizontal: 20}}>
              <Button
                title={`Ethereum:\n $${this.state.ethereumPrice}`}
                onPress={() => navigate('Ethereum')}
                />
            </View>
            <Button
              title={`LiteCoin:\n $${this.state.liteCoinPrice}`}
              onPress={() => navigate('LiteCoin')}
              />
          </View>

          <Text style={styles.welcome}>
            CryptoNews!
          </Text>

          <View style={styles.newsWrapper}>
            <Text style={styles.newsTitle}>
              {this.state.newsFeed0.title}
            </Text>

            <Text style={styles.newsAuthor}>
              posted by.. {this.state.newsFeed0.author}
            </Text>

            <Text style={styles.newsDescription}>
              {this.state.newsFeed0.description}
            </Text>
          </View>

          <View style={styles.newsWrapper}>
            <Text style={styles.newsTitle}>
              {this.state.newsFeed1.title}
            </Text>

            <Text style={styles.newsAuthor}>
              posted by.. {this.state.newsFeed1.author}
            </Text>

            <Text style={styles.newsDescription}>
              {this.state.newsFeed1.description}
            </Text>
          </View>

          <View style={styles.newsWrapper}>
            <Text style={styles.newsTitle}>
              {this.state.newsFeed2.title}
            </Text>

            <Text style={styles.newsAuthor}>
              posted by.. {this.state.newsFeed2.author}
            </Text>

            <Text style={styles.newsDescription}>
              {this.state.newsFeed2.description}
            </Text>
          </View>

          <View style={styles.newsWrapper}>
            <Text style={styles.newsTitle}>
              {this.state.newsFeed3.title}
            </Text>

            <Text style={styles.newsAuthor}>
              posted by.. {this.state.newsFeed3.author}
            </Text>

            <Text style={styles.newsDescription}>
              {this.state.newsFeed3.description}
            </Text>
          </View>

          <View style={styles.newsWrapper}>
            <Text style={styles.newsTitle}>
              {this.state.newsFeed4.title}
            </Text>

            <Text style={styles.newsAuthor}>
              posted by.. {this.state.newsFeed4.author}
            </Text>

            <Text style={styles.newsDescription}>
              {this.state.newsFeed4.description}
            </Text>
          </View>

          <View style={styles.newsWrapper}>
            <Text style={styles.newsTitle}>
              {this.state.newsFeed5.title}
            </Text>

            <Text style={styles.newsAuthor}>
              posted by.. {this.state.newsFeed5.author}
            </Text>

            <Text style={styles.newsDescription}>
              {this.state.newsFeed5.description}
            </Text>
          </View>

          <View style={styles.newsWrapper}>
            <Text style={styles.newsTitle}>
              {this.state.newsFeed6.title}
            </Text>

            <Text style={styles.newsAuthor}>
              posted by.. {this.state.newsFeed6.author}
            </Text>

            <Text style={styles.newsDescription}>
              {this.state.newsFeed6.description}
            </Text>
          </View>

          <View style={styles.newsWrapper}>
            <Text style={styles.newsTitle}>
              {this.state.newsFeed7.title}
            </Text>

            <Text style={styles.newsAuthor}>
              posted by.. {this.state.newsFeed7.author}
            </Text>

            <Text style={styles.newsDescription}>
              {this.state.newsFeed7.description}
            </Text>
          </View>

          <View style={styles.newsWrapper}>
            <Text style={styles.newsTitle}>
              {this.state.newsFeed8.title}
            </Text>

            <Text style={styles.newsAuthor}>
              posted by.. {this.state.newsFeed8.author}
            </Text>

            <Text style={styles.newsDescription}>
              {this.state.newsFeed8.description}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 10
  },
  marqeeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 10,
    backgroundColor: 'blue',
    width:400,
    height:50,
    fontWeight:'900',
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
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  newsWrapper: {
    backgroundColor: 'lightgray',
    borderColor: 'white',
    borderWidth: 1,
    padding: 10
  }
});


AppRegistry.registerComponent('home', () => home);
