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

const ACCESS_TOKEN = 'access_token';

export default class LoginForm extends Component {
  constructor(){
    super();

    this.state = { session: {
      email: "",
      password: "",
      error: "",
      showProgress: false
    }};
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

      var responseJson = await fetch("http://192.168.169.43:3000/login", {
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

      // console.log('key is: ', ACCESS_TOKEN)
      // console.log('value is: ', accessToken)


      await AsyncStorage.setItem('access_token', accessToken, (err)=> {
        if(err){
          console.error("an error");
          console.error(err);
        }
      })
      this.props.handleToken2()

      // var value = await AsyncStorage.getItem('access_token')
      //
      // console.log(value)
  }


  handleUserSubmit = this.handlePress.bind(this)


  render () {
    return (
    <View  style={styles.container}>
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
      <Text style={styles.error}>
          {this.state.error}
        </Text>

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
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
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
  },
  error: {
    color: 'red',
  }
});

export { LoginForm }
