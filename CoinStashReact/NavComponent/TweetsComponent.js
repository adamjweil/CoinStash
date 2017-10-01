import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class TweetsComponent extends Component {
  constructor() {
    super();
    this.state = {
      tweet0: [],
      tweet1: [],
      tweet2: [],
      tweet3: [],
    }
  }
  componentDidMount() {
    this.getCurrentTweets();
    setInterval(this.getCurrentTweets, 100000);
  }

  getCurrentTweets = () => {
    fetch('http://localhost:3000/tweets')
    .then(function(response) {
      return response.json();
    })
    .then((obj) => {
      this.setState({tweet0: obj[0]})
      this.setState({tweet1: obj[1]})
      this.setState({tweet2: obj[2]})
      this.setState({tweet3: obj[3]})
    })
  }
  render() {
    const { title, description, url, urlToImage, author } = this.props
    return (
      <View>
        <Text style={styles.tweetContainer}>
          {this.state.tweet0.text}
        </Text>

        <Text style={styles.tweetContainer}>
          {this.state.tweet1.text}
        </Text>

        <Text style={styles.tweetContainer}>
          {this.state.tweet2.text}
        </Text>

        <Text style={styles.tweetContainer}>
          {this.state.tweet3.text}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    width: 300,
    height: 300,
  },
  tweetContainer: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
    width: 300,
    height: 100,
  },
});
