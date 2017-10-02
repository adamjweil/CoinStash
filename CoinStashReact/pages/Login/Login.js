import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicatorIOS,
  KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm'

export default class Login extends Component {

  render () {
    return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../images/logo-placeholder.png')} />
        <Text style={styles.title}>CoinStash</Text>
        <Text style={styles.subtitle}>Login to CoinStash</Text>
      </View>
      <View style={styles.formContainer}>
        <LoginForm />
      </View>
    </KeyboardAvoidingView>
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
  }
});
