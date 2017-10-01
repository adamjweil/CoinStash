

import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class RSSFeed extends Component {
  constructor() {
    super();
    this.state = {
      rssPosts: []
    };
  }

  componentDidMount() {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.bitnewz.net%2Frss%2FFeed%2F25')
    .then(function(response) {
      return response.json();
    })
    .then((obj) => {
      console.log(obj.items)
      this.setState({rssPosts: obj.items})
    })
  }

  render() {
    return (

      <View style={styles.rssView}>

          {this.state.rssPosts.map((rss) =>
            <Text style={styles.rssPost}>
              {rss.title}{'\n'}
              {rss.pubDate}{'\n'}
            </Text>
          )}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  rssView: {
    // borderWidth: 1,
    // borderRadius: 1
  },
  rssPost: {
    fontSize: 12,
    textAlign: 'left',
    margin: 2,
    borderWidth: 1,
    borderRadius: 5
  },
});
