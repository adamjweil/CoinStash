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
<<<<<<< HEAD
import Form from './form';
import p2pForm from './p2pform';

=======
>>>>>>> nav-updates



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
<<<<<<< HEAD
    LiteCoin: { screen: LiteCoin },
    Form: { screen: Form },
    p2pForm: { screen: p2pForm } 
=======
    LiteCoin: { screen: LiteCoin }
>>>>>>> nav-updates
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left'
  }
);



export default CoinStashReact;
