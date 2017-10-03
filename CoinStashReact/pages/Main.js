import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
// import  NewsFeed  from './NavComponent/NewsFeed'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './Login/Login'
import {CoinStashReact, loginStuff} from './app'

export default class Main extends Component {
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
      page = <CoinStashReact />
    } else {
      page = <Login handleToken={this.accessTokenCallBack} navigation={this.props.navigation}/>
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
