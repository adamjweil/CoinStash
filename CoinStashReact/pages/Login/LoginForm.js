import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { AsyncStorage, Text, StyleSheet, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';

const ACCESS_TOKEN = 'access_token';

export default class LoginForm extends Component {
  static navigationOptions = {
    title: 'Login Here'
  };
  constructor(){
    super();

    this.state = { session: {
      email: "",
      password: "",
      error: "",
      showProgress: false
    }
   };
  }

    handleInputChange(name, val) {
      const session = this.state.session;
      session[name] = val;
      this.setState({session: session})
    }

    onChangeEmail = this.handleInputChange.bind(this, "email")
    onChangePassword = this.handleInputChange.bind(this, "password")

    async handlePress() {
      this.setState({showProgress: true})
      const { session } = this.state

      var responseJson = await fetch("https://coinstache-backend.herokuapp.com/login", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({session})
      })
      .then(function(response) {return response.json()} )
      .catch(error => console.error("fetch error: ", error))

      let accessToken = responseJson.access_token

      await AsyncStorage.setItem('access_token', accessToken, (err)=> {
        if(err){
          console.error("an error");
          console.error(err);
        }
      })
      this.props.handleToken2()
      this.props.stringTokenCallBack()

      var value = await AsyncStorage.getItem('access_token')
  }


  handleUserSubmit = this.handlePress.bind(this)

  render () {
    return (
    <View  style={styles.wrapper}>
      <StatusBar
        barStyle="light-content"
      />

      <TextInput
        onChangeText={this.onChangeEmail}
        placeholder="Email"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => this.passwordInput.focus()}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        ref={(input) => this.emailInput = input}/>

      <TextInput
        onChangeText={this.onChangePassword}
        placeholder="Password"
        placeholderTextColor="gray"
        returnKeyType="go"
        secureTextEntry={true}
        style={styles.input}
        ref={(input) => this.passwordInput = input}/>

      <TouchableOpacity
        onPress={this.handleUserSubmit}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={this.props.switchPages}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.error}>
          {this.state.error}
        </Text>

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
    padding: 20,
  },
  input: {
    height: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    height: 25,
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
