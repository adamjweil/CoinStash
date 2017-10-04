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
      selectedIndex: 2,
      text: '00.00',
      input: ""
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  componentDidMount() {
    fetch('http://localhost:3000/coinbases/usdwallet')
    .then(function(response) {
      return response.json();
    }).then((obj) => {
      let usdN = obj.name
      let usdB = obj.balance.amount
      let usdC = obj.balance.currency
    this.setState({usdName: usdN, usdBal: usdB, usdCCY: usdC})
  })

}

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
            keyboardType={'default'}
            style={styles.sendPaymentAddress, styles.sendPaymentValue}
            onChangeText={(input) => this.setState({input})}
            value={this.state.input} />
        </View>

        <View style={styles.formInputContainer}>
            <Text style={styles.labelTitle}>Amount</Text>
                <TextInput
                placeholder={"Enter amount"}
                keyboardType={'numeric'}
                style={styles.sendPaymentValue}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text} />
        </View>


        </View>
        <Button
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
