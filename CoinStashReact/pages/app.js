import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';

import HomeScreen from './home';
import BitCoin from './btc';
import Ethereum from './eth';
import LiteCoin from './ltc';

import p2pForm from './p2pform';
import ProfilePage from './ProfilePage';

const CoinStashReact = DrawerNavigator(
  {
    Home: { screen: HomeScreen, },
    BitCoin: {
      screen: BitCoin,
      navigationOptions: {
        title: 'BitCoin Dashboard'
      }
    },
    Ethereum: {
      screen: Ethereum,
      navigationOptions: {
        title: 'Ethereum Dashboard'
      }
    },
    LiteCoin: {
      screen: LiteCoin,
      navigationOptions: {
        title: 'LiteCoin Dashboard'
      }
    },
    Profile: {
      screen: ProfilePage,
      navigationOptions: {
        title: 'My Wallets'
      }
    },
    p2pForm: {
      screen: p2pForm,
      navigationOptions: {
        title: 'Send Payments'
      }
    }
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left'
  }
);

export default CoinStashReact;
