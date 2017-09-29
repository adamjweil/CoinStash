import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import HomeScreen from './home';
import BitCoin from './btc';

const CoinStashReact = StackNavigator({
  Home: { screen: HomeScreen },
  BitCoin: { screen: BitCoin },
});

export default CoinStashReact;
