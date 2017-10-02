/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
// import  NewsFeed  from './NavComponent/NewsFeed'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './pages/Login/Login'
// import CoinStashReact from './pages/app'

export default class LoginProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accessToken: false
    }
  }

  accessTokenCallBack = () => {
    //stuff that happens when you get the token
    this.setState({accessToken: true})
  }

  render() {
    const {accessToken} = this.state

    var page
    if (accessToken) {
      // page = <MainNavigator />
      page = <Text>You did it!</Text>
    } else {
      page = <Login handleToken={this.accessTokenCallBack} />

    }

    return (
      <View style={styles.wrapper}>
        {page}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#bdc3c7',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('CoinStashReact', () => LoginProject);
