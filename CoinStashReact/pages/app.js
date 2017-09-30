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
import Ethereum from './eth';
import LiteCoin from './ltc';

const CoinStashReact = StackNavigator({
  Home: { screen: HomeScreen },
  BitCoin: { screen: BitCoin },
  Ethereum: { screen: Ethereum },
  LiteCoin: { screen: LiteCoin }
});

export default CoinStashReact;
