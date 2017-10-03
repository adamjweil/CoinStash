import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { DrawerNavigator, StackNavigator } from 'react-navigation';

import HomeScreen from './home';
import BitCoin from './btc';
import Ethereum from './eth';
import LiteCoin from './ltc';

import p2pForm from './p2pform';
import Register from './Register/Register'
import Login from './Login/Login'
import Main from './Main'

// use getScreen instead of screen
// , getScreen: (importantStuff) => <Ethereum {...importantStuff} myPropName={myPropValue} />
//  ^-----CHECK DOCS

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

const LoginStuff = DrawerNavigator(
  {
    Main: {screen: Main},
    Register: {screen: Register},
    Login: {screen: Login}
  },
  {
    initialRouteName: 'Main',
    drawerPosition: 'left'
  }
);



export {CoinStashReact, LoginStuff};
