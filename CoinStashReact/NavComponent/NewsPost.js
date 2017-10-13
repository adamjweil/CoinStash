import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class NewsPost extends Component {
  render() {
    const { title, description, url, urlToImage, author } = this.props
    return (
      <Text style={styles.welcome}>
        {title}{'\n'}
        {description}{'\n'}
        {author}{'\n'}
        {url}{'\n'}
      </Text>
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
});
