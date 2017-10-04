/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
'use strict';
import React, { Component } from 'react';
import { Button, ButtonGroup, FormLabel, FormInput } from 'react-native-elements'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class p2pForm extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      email: "",
      amount: '00.00'
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    let currency = ""
    if (selectedIndex = 0) {
      currency = 'BTC'
    } else if (selectedIndex = 1){
      currency = 'ETH'
    } else if (selectedIndex = 2){
      currency = 'LTC'
    } else if (selectedIndex = 3){
      currency = 'USD'
    } else {
      currency = "invalid"
    }
  }


  handlePress() {
    this.setState()
    const { sendMoney } = this.state

    var responseJson = await fetch("http://localhost:3000/coinbases/sendpayment", {
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

  static navigationOptions = {
    title: 'p2pForm',
  };

  render() {
    let state = this.state;
    const { navigate } = this.props.navigation;
    const buttons = ['BTC', 'ETH', 'LTC', 'USD']
    const { selectedIndex } = this.state
    return (
      <View style={styles.container}>

        <Text style={styles.formTitle}>Send</Text>

        <View style={styles.formContainer}>
          <View style={styles.formInputContainer}>
            <Text style={styles.labelTitle}>From Wallet: </Text>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 50, marginLeft: 50, marginTop: 10}}
            />

          </View>

          <View style={styles.formInputContainer}>
            <Text style={styles.labelTitle}>Send to: </Text>
            <TextInput
              placeholder={"Enter email"}
              keyboardType={'email-address'}
              style={styles.sendPaymentAddress, styles.sendPaymentValue}
              onChangeText={(email) => this.setState({email})}
              value={this.state.input} />
            </View>

            <View style={styles.formInputContainer}>
              <Text style={styles.labelTitle}>Amount</Text>
              <TextInput
                placeholder={"Enter amount"}
                keyboardType={'numeric'}
                style={styles.sendPaymentValue}
                onChangeText={(amount) => this.setState({amount})}
                value={this.state.amount} />
              </View>


            </View>
            <Button
              onPress={this.handleUserSubmit}
              buttonStyle={{backgroundColor: '#185A9D', borderRadius: 2, marginTop: 10, width: 300}}
              textStyle={{textAlign: 'center'}}
              title={`SEND`}
            />

          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
      },
      formInputContainer: {
        width: 300,
      },
      formContainer: {
        marginLeft: -40
      },
      sendPaymentValue: {
        width: 300,
        color: "#aaa",
        paddingLeft: 10,
        paddingTop: 15,
        borderBottomColor: 'rgba(24, 90, 157, .5)',
        borderBottomWidth: 1.5,
        borderStyle: 'solid',
        marginLeft: 20,
        paddingBottom: 5
      },
      labelTitle: {
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 20
      },
      sendPaymentAddress: {
        fontSize: 10
      },
      formTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
      },
    });
