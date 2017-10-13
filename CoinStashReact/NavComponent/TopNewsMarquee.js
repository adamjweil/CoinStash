

import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
var MarqueeLabel = require('@remobile/react-native-marquee-label');

export default class TopNewsMarquee extends Component {
  constructor() {
    super();
    this.state = {
      rss2: [],
      rss3: [],
      rss4: [],
      rss5: []
    };
  }

  componentDidMount() {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.reddit.com%2Fr%2FBitcoin%2F.rss')
    .then(function(response) {
      return response.json();
    })
    .then((obj) => {
      this.setState({rss2: obj.items[2]})
      this.setState({rss3: obj.items[3]})
      this.setState({rss4: obj.items[4]})
    })
  }

  render() {
    return (

      <View style={styles.topNewsView}>

        <MarqueeLabel style={styles.marqueeLabel} scrollDuration={4.0}>
          {this.state.rss3.title}
        </MarqueeLabel>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  topNewsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rssPost: {
    fontSize: 12,
    textAlign: 'left',
    margin: 2,
    borderWidth: 1,
    borderRadius: 5
  },

  marqueeLabel: {
      backgroundColor: 'blue',
      width:400,
      height:50,
      fontSize:30,
      fontWeight:'800',
      color:'white',
  }
});
