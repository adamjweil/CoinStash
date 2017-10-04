import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { ListItem, Thumbnail, Body } from 'native-base';

export default class RSSFeed extends Component {
  constructor() {
    super();
    this.state = {
      rssPosts: []
    };
  }

  componentDidMount() {
    this.getCurrentReddit();
    setInterval(this.getCurrentReddit, 200000);
  }

  getCurrentReddit = () => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.reddit.com%2Fr%2FBitcoin%2Ftop%2F.rss&api_key=d92ks2w1mac3z34wxbpajfqfhpb6cke3jlxzhagd')
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
    width: 390,
    marginLeft: -20,

  },
  rssPost: {
    fontSize: 12,
    textAlign: 'left',
    margin: 2,
    paddingLeft: 20

  },
  rssPubDate: {
    fontSize: 9,
    fontWeight: '300'
  },
  redditReadMore: {
    marginLeft: -325,
    marginTop: 40
  }
});
