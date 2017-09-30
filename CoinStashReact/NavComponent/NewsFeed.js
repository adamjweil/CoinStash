/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class NewsFeed extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=ed62d0aea575414fbdf6a1351c0fa66a')
    .then(function(response) {
      return response.json();
      })
    .then((obj) => {
      this.setState({newsFeed: obj.articles})
      console.logx(newsFeed)

    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.newsFeed}

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
