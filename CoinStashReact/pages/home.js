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
  Button
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
          CryptoNews!
        </Text>
        <Button title="BitCoin" onPress={() => navigate('BitCoin')} />

        <View style={styles.newsWrapper}>
          <Image style={{width: 50, height: 50}}
                  source={{uri: '{this.state.newsFeed0.urlToImage}'}} />
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
          <Image style={{width: 50, height: 50}}
                  source={{uri: '{this.state.newsFeed1.urlToImage}'}} />
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
          <Image source={{uri: '{this.state.newsFeed2.urlToImage}'}}
     style={{width: 50, height: 50}} />
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
          <Image source={{uri: '{this.state.newsFeed3.urlToImage}'}}
     style={{width: 50, height: 50}} />
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
          <Image source={{uri: '{this.state.newsFeed4.urlToImage}'}}
     style={{width: 50, height: 50}} />
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
  },
  newsWrapper: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 10,
    marginRight: 10,


  }
});


AppRegistry.registerComponent('home', () => home);
