import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView, Image, Linking } from 'react-native';
import { ListItem, Thumbnail, Text, Body } from 'native-base';


export default class TweetsComponent extends Component {
  constructor() {
    super();
    this.state = {
      tweets: []
    }
  }
  componentDidMount() {
    this.getCurrentTweets();
    setInterval(this.getCurrentTweets, 100000);
  }

  getCurrentTweets = () => {
    fetch('https://coinstache-backend.herokuapp.com/tweets/hashtag')
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
        {this.state.tweets.map((tweet, i) =>
          <View style={styles.tweetContainer}>
            <ListItem>
                <Thumbnail style={styles.twitterAvatar} size={60} source={{uri: tweet.user.profile_image_url_https}} />
                <Body>
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>@{tweet.user.screen_name}</Text>
                  </View>
                  <Text style={styles.content}>{tweet.text}</Text>
                </Body>
            </ListItem>
          </View>
      )}

    </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  tweetContainer: {
    width: 320,
    marginRight: 20
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  username: {
    fontWeight: '200',
    fontSize: 12,
  },
  content: {
    fontSize: 12,
  },
  twitterAvatar: {
    paddingBottom: 50,
    marginTop: -8
  }

});
