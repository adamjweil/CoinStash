import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { StackNavigator, DrawerNavigator } from 'react-navigation';

import HomeScreen from './home';
import BitCoin from './btc';
import Ethereum from './eth';
import LiteCoin from './ltc';



const CoinStashReact = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    BitCoin: { screen: BitCoin },
    Ethereum: { screen: Ethereum },
    LiteCoin: { screen: LiteCoin }
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left'
  }
);

export default CoinStashReact;
