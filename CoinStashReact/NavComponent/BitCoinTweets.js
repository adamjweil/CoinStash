import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Linking
} from 'react-native';

export default class BitCoinTweets extends Component {
  constructor() {
    super();
    this.state = {
      BitCoinTweets: []
    }
  }
  componentDidMount() {
    this.getBitcoinTweets();
    setInterval(this.getBitcoinTweets, 100000);
  }

  getBitcoinTweets = () => {
    fetch('http://localhost:3000/tweets/bitcoin')
    .then(function(response) {
      return response.json();
    })
    .then((obj) => {
      // console.log(obj[0])
      this.setState({BitCoinTweets: obj})
    })
  }
  render() {

    return (
      <ScrollView style={styles.scrollView}>
        {this.state.BitCoinTweets.map((tweet, i) =>
        <View style={styles.tweetContainer}>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
              <View>
                <Image source={{uri: tweet.user.profile_image_url_https}} style={styles.tweetPhoto} />
              </View>
              <View style={styles.tweetText}>
                <Text style={styles.tweetTextView}>{tweet.text}<Text style={styles.tweetAuthor}>...posted by <Text style={{fontWeight: 'bold'}}>@{tweet.user.screen_name}</Text></Text> </Text>
              </View>
            </View>

            <View style={styles.tweetMentions}>
              <Text style={styles.tweetMentions}>Retweets: {tweet.retweet_count} | Favorites: {tweet.favorite_count}</Text>
            </View>

        </View>
      )}

    </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  tweetContainer: {
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
    textAlign: 'left',
    flex: 1
  },
  tweetAuthor: {
    fontSize: 10,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: '300'
  },
  tweetHashtag: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tweetPhoto: {
    width: 50,
    height: 50,
    borderRadius: 10
  },
  tweetTextView: {
    width: 320,
    fontSize: 12,
    textAlign: 'center'
  },
  tweetAuthorView: {
    flex: 1,
  },
  ScrollView: {
    flex: 1
  },
  tweetText: {
    flexWrap: 'wrap'
  },
  tweetMentions: {
    fontSize: 8,
    fontWeight: '200',
    textAlign: 'center',
    justifyContent: 'center'
  }
});
