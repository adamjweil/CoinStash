import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { DrawerNavigator } from 'react-navigation';

import HomeScreen from './home';
import BitCoin from './btc';
import Ethereum from './eth';
import LiteCoin from './ltc';

import p2pForm from './p2pform';


const CoinStashReact = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    BitCoin: {
      screen: BitCoin,
      navigationOptions: {
        title: 'BitCoin'
      }
    },
    Ethereum: { screen: Ethereum },
    LiteCoin: { screen: LiteCoin },
    p2pForm: { screen: p2pForm }
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left'
  }
);



export default CoinStashReact;
