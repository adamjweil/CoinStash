import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { ListItem, Thumbnail, Text, Body } from 'native-base';

export default class BitCoinTweets extends Component {
  constructor() {
    super();
    this.state = {
      BitCoinTweets: []
    }
  }

  componentWillMount() {
    this.getBitcoinTweets();
    setInterval(this.getBitcoinTweets, 1000);
  }

  getBitcoinTweets = () => {
    fetch('https://coinstache-backend.herokuapp.com/tweets/bitcoin')
    .then(function(response) {
      return response.json();
    })
    .then((obj) => {
      // console.log(obj[0])
      this.setState({BitCoinTweets: obj})
    })
  }
  twitterButton = (tweet) => {
    return(
      <TouchableOpacity onPress={()=> Linking.openURL(tweet.user.url)}>
        <Text style={styles.name}>Read More..</Text>
      </TouchableOpacity>
    )
  }
  render() {

    return (
      <ScrollView style={styles.scrollView}>
        {this.state.BitCoinTweets.map((tweet, i) =>
          <View style={styles.tweetContainer} key={i}>
            <ListItem>
              <Thumbnail style={styles.twitterAvatar} size={60} source={{uri: tweet.user.profile_image_url_https}} />
              <Body>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>@{tweet.user.screen_name}</Text>
                </View>
                <Text style={styles.content}>{tweet.text}</Text>
                {tweet.user.url ? this.twitterButton(tweet) : <Text style={styles.content}></Text>}
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
    width: 400,
    marginRight: 50,
    marginLeft: -20,
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
    marginTop: -8,
    paddingLeft: 30,
    marginLeft: 30
  }
});
