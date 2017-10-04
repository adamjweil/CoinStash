import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  AsyncStorage,
  Text,
  StyleSheet,
  View,
  Image,
  } from 'react-native';
import LoginForm from './LoginForm'


export default class Login extends Component {

  render () {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.title}>CoinStash</Text>
            <Text style={styles.subtitle}>Login to CoinStash Or Sign Up</Text>
          </View>
          <View style={styles.formContainer}>
            <LoginForm handleToken2={this.props.handleToken} switchPages={this.props.switchPages} stringTokenCallBack={this.stringTokenCallBack}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    marginTop: 40,
    width: 200,
    height: 200,
    backgroundColor: 'gray',

  },
  title: {
    color: 'gray',
    marginTop: 10,
    width: 200,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',

  },
  subtitle: {
    color: 'gray',
    marginTop: 10,
    width: 200,
    textAlign: 'center',
    fontSize: 16
  },
  buttonContainer: {
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical:  15,
    borderWidth: 1,
    borderColor: 'gray',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 30,

  },
  buttonText: {
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.0)',
    alignItems: 'center',
  }
});
