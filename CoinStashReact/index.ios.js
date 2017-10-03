/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
// import  NewsFeed  from './NavComponent/NewsFeed'
import {
  AppRegistry
} from 'react-native';
import {LoginStuff} from './pages/app'

export default class MyProject extends Component {
  render() {
    return (
      <LoginStuff/>
    );
  }
}

AppRegistry.registerComponent('CoinStashReact', () => MyProject);
