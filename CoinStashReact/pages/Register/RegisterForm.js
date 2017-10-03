import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';


export default class RegisterForm extends Component {
  constructor(){
    super();

    this.state = { user: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: [],
      showProgress: false
    }};
  }

    handleInputChange(name, val) {
      const user = this.state.user;
      user[name] = val;
      this.setState({user: user})
    }

    onChangeFirstName = this.handleInputChange.bind(this, "first_name")
    onChangeLastName = this.handleInputChange.bind(this, "last_name")
    onChangeEmail = this.handleInputChange.bind(this, "email")
    onChangePassword = this.handleInputChange.bind(this, "password")
    onChangePasswordConfirmation = this.handleInputChange.bind(this, "password_confirmation")

    handlePress() {
    const { user } = this.state
    fetch("http://192.168.169.43:3000/users", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user})
    }).then((response) => console.log(response))
  }

  handleNewUserSubmit = this.handlePress.bind(this)


  render () {
    return (
    <View  style={styles.container}>
      <StatusBar
        barStyle="light-content"
      />
      <TextInput
        onChangeText={this.onChangeFirstName}
        placeholder="First Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => this.lastNameInput.focus()}
        autoCorrect={false}
        style={styles.input}
        ref={(input) => this.firstNameInput = input}/>

      <TextInput
        onChangeText={this.onChangeLastName}
        placeholder="Last Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => this.emailInput.focus()}
        autoCorrect={false}
        style={styles.input}
        ref={(input) => this.lastNameInput = input}/>

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

      <TextInput
          onChangeText={this.onChangePasswordConfirmation}
          placeholder="Password Confirmation"
          placeholderTextColor="gray"
          returnKeyType="go"
          secureTextEntry={true}
          style={styles.input}
          ref={(input) => this.passwordInput = input}/>

      <TouchableOpacity
        onPress={this.handleNewUserSubmit}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
    );
  }
}
const styles = StyleSheet.create({
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
