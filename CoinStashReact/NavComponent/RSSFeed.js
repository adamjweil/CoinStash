

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
      rssFeed: []
    };
  }

  componentDidMount() {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.bitnewz.net%2Frss%2FFeed%2F25')
    .then(function(response) {
      return response.json();

    })
    .then((obj) => {
      console.log(obj.items)
      this.setState({rssFeed: obj})
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>


        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: 300,
    height: 300,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    width: 300,
    height: 300,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    width: 300,
    height: 300,
  },
  header: {
    backgroundColor: 'blue'
  },
});
