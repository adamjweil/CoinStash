/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CoinStashReact from './pages/app'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

console.disableYellowBox = true;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accessToken: false,
      loginOrRegister: true
      // false = register
      // true = login page
    }
  }

  stringTokenCallBack = (token) => {
    console.log('callback success!: ', token)
  }

  accessTokenCallBack = () => {
    this.setState({accessToken: true})
  }

  switchLoginPage = () => {
  this.setState({loginOrRegister: !this.state.loginOrRegister})
}

  render(){
    const { accessToken, loginOrRegister, token} = this.state
    if (accessToken){
      return (
        <CoinStashReact />
      )
    }else {
      if (loginOrRegister){
        return (
          <Login switchPages={this.switchLoginPage} handleToken={this.accessTokenCallBack} stringTokenCallBack={this.stringTokenCallBack} />
        )
      } else {
        return (
          <Register switchPages={this.switchLoginPage} handleToken={this.accessTokenCallBack} stringTokenCallBack={this.stringTokenCallBack}/>
        )
      }
    }
  }
}

AppRegistry.registerComponent('CoinStashReact', () => App);
