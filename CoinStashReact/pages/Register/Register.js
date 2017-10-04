import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';
import RegisterForm from './RegisterForm'

export default class Register extends Component {
  render () {
    return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>CoinStash</Text>
          <Text style={styles.subtitle}>Register for CoinStash</Text>
        </View>
        <View style={styles.formContainer}>
          <RegisterForm handleToken2={this.props.handleToken} switchPages={this.props.switchPages} stringTokenCallBack={this.stringTokenCallBack}/>
        </View>
      </KeyboardAvoidingView>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#bdc3c7',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
