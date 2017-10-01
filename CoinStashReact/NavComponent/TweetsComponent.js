import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

export default class TweetsComponent extends Component {
  constructor() {
    super();
    this.state = {
      tweets: []
    }
  }
  componentDidMount() {
    this.getCurrentTweets();
    setInterval(this.getCurrentTweets, 50000);
  }

  getCurrentTweets = () => {
    fetch('http://localhost:3000/tweets/hashtag')
    .then(function(response) {
      return response.json();
    })
    .then((obj) => {
      this.setState({tweets: obj})
    })
  }
  render() {

    return (

      <ScrollView style={styles.scrollView}>
      <View style={styles.tweetStyle}>
        {this.state.tweets.map((tweet) =>
          <Text style={styles.tweetText}>
            {tweet.text}{'\n'}
              {tweet.entities.hashtags.map((hash) =>
                <Text style={styles.tweetHashtag}>#{hash.text}</Text>
                )}
                {'\n'}
            <Text style={styles.tweetAuthor}>.....posted by{tweet.user.name}</Text>
          </Text>
        )}

      </View>
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  tweetContainer: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
    width: 300,
    height: 100,
  },
  tweetAuthor: {
    fontSize: 10,
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 20
  },
  tweetHashtag: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  ScrollView: {

  }
});
