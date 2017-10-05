
/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
'use strict';
import React, { Component } from 'react';
import { Button, ButtonGroup, FormLabel, FormInput } from 'react-native-elements'
import { BackToHomeBTN } from '../NavComponent/BackToHomeBTN';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StackNavigator} from 'react-navigation';
import ProfilePage from './ProfilePage';

class p2pForm extends Component {
  constructor() {
    super();
    this.state = { session: {
      selectedIndex: 0,
      to: "no",
      amount: '00.00',
      currency: 'BTC'
    }
  };
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  handleInputChange(name, val) {
    const session = this.state.session;
    session[name] = val;
    this.setState({session: session})
  }
  onChangeEmail = this.handleInputChange.bind(this, "to")
  onChangeAmount = this.handleInputChange.bind(this, "amount")


  handlePress() {
    const { session } = this.state
    let responseJson = fetch ("https://rocky-atoll-80901.herokuapp.com/coinbases/sendpayment", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: session.to,
        amount: session.amount,
        currency: session.currency
       })
    })
    .then(function(response) {
      Alert.alert(
        'Confirm Transfer',
        'Pls Confirm Transfer'
        [
          {text: 'Confirmed', onPress: () => this._navigate()}
        ]
      )
    })
    let sendParams = responseJson
}
_navigate(){
  this.props.navigation.push({
    name: 'ProfilePage'
  })
}

handleUserSubmit = this.handlePress.bind(this)

static navigationOptions = {
  header: null
}

  render() {
    let state = this.state;
    const { navigate } = this.props.navigation;
    const buttons = ['BTC', 'ETH', 'LTC', 'USD']
    const { selectedIndex } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.BackToHomeBTN}>
        <BackToHomeBTN navigate={navigate} />
        </View>
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
              onChangeText={this.onChangeEmail}
              value={this.state.input} />
            </View>

            <View style={styles.formInputContainer}>
              <Text style={styles.labelTitle}>Amount</Text>
              <TextInput
                placeholder={"Enter amount"}
                keyboardType={'numeric'}
                style={styles.sendPaymentValue}
                onChangeText={this.onChangeAmount}
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
    const confirmXfer = StackNavigator({
      p2pForm: {
        screen: p2pForm
      },
      ProfilePage: {
        screen: ProfilePage,
        navigationOptions: {
          title: 'ProfilePage',
          headerBackTitle: 'ProfilePage'
        }
      }
    },
    {
      initialRouteName: 'p2pForm'
  })

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
      BackToHomeBTN: {
        marginLeft: "-80%"
      }
    });

    export default confirmXfer;
