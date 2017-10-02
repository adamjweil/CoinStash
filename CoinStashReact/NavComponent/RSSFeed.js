

import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ListItem, Thumbnail, Body } from 'native-base';
// var MarqueeLabel = require('@remobile/react-native-marquee-label');
// import TopNewsMarquee from 'TopNewsMarquee';

export default class RSSFeed extends Component {
  constructor() {
    super();
    this.state = {
      rssPosts: [],
      rss2: [],
      rss3: [],
      rss4: [],
      rss5: []
    };
  }

  componentDidMount() {
    // fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.bitnewz.net%2Frss%2FFeed%2F25')
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.reddit.com%2Fr%2FBitcoin%2F.rss')
    .then(function(response) {
      return response.json();
    })
    .then((obj) => {
      this.setState({rssPosts: obj.items})
    })
  }

  render() {
    return (

      <View style={styles.rssView}>

          {this.state.rssPosts.map((rss) =>
            <ListItem>
                <Text style={styles.rssPost}>
                  {rss.title} <Text style={styles.rssPubDate}>published on.. {rss.pubDate}</Text>
                </Text>
            </ListItem>
          )}

      </View>

    )
  }
}

const styles = StyleSheet.create({
  rssView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rssPost: {
    fontSize: 12,
    textAlign: 'left',
    margin: 2,
    // borderWidth: 1,
    // borderRadius: 5
  },
  rssPubDate: {
    fontSize: 8,
    fontWeight: '300'
  }
});
