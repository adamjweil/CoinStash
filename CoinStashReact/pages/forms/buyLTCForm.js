/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import { Button, ButtonGroup, FormLabel, FormInput } from 'react-native-elements'
import SelectInput from 'react-native-select-input-ios';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Picker
} from 'react-native';
// var MarqueeLabel = require('@remobile/react-native-marquee-label');

export default class form extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      text: '00.00'
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }


  getPickerOptions() {
    return [
      { value: 0, label: 'Select Wallet...' },
      { value: 1, label: 'USD Wallet'      },
      { value: 2, label: 'BTC Wallet'     },
      { value: 3, label: 'ETH Wallet'     },
      { value: 4, label: 'LTC Wallet' },

    ];
  }

  onSubmitEditingLarge(value) {
    this.setState({
      valueLarge: value
    });
  }

  componentDidMount() {
  }

  render() {
    let state = this.state;
    const buttons = ['BTC', 'ETH', 'LTC']
    const { selectedIndex } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.formTitle}>BUY</Text>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 50}} />

          <View style={styles.inputContainer}>
            <Text style={styles.labelTitle}>Payment Method:</Text>
            <SelectInput
              value={state.valueLarge}
              options={this.getPickerOptions()}
              onCancelEditing={() => console.log('onCancel')}
              onSubmitEditing={this.onSubmitEditingLarge.bind(this)}
              style={[styles.paymentMethod, styles.selectInputLarge]}
            />
          </View>

        <View style={styles.twoColumnLayout}>

          <View style={styles.flexDirectionColumn, styles.firstPaymentColumn}>
            <View style={styles.currencyInputContainer}>
              <Text style={styles.currencyPriceLabel}>USD</Text>
              <TextInput
                keyboardType={'numeric'}
                style={styles.paymentInteger}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                />
            </View>
          </View>

          <View style={styles.flexDirectionColumn, styles.secondPaymentColumn}>
            <View style={styles.currencyInputContainer}>
              <Text style={styles.currencyPriceLabel}>
                  LTC
              </Text>
              <TextInput
                keyboardType={'numeric'}
                style={styles.paymentInteger}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                />
            </View>
          </View>

        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelTitle}>Deposit to:</Text>
          <SelectInput
            value={state.valueLarge}
            options={this.getPickerOptions()}
            onCancelEditing={() => console.log('onCancel')}
            onSubmitEditing={this.onSubmitEditingLarge.bind(this)}
            style={[styles.paymentMethod, styles.selectInputLarge]}
          />
        </View>
        <Button
          raised
          buttonStyle={{backgroundColor: '#185A9D', borderRadius: 2, marginTop: 10, width: 300}}
          textStyle={{textAlign: 'center'}}
          title={`BUY`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
    backgroundColor: '#eee',
    alignItems: 'center',
    flex: 1
  },
  labelTitle: {
    textAlign: 'left',
    marginTop: 10,
    marginBottom: -15
  },
  inputContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 40,
    borderBottomColor: 'rgba(24, 90, 157, .5)',
    borderBottomWidth: 1,
    width: 290
  },
  paymentMethod: {
    marginTop: 35,
    paddingBottom: 10,
  },
  formTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  twoColumnLayout: {
    flexDirection: 'row',
  },
  paymentInteger: {
    height: 30,
    backgroundColor: 'transparent',
    width: 145,
    textAlign: 'right',
    paddingRight: 10
  },
  firstPaymentColumn: {
    borderStyle: 'solid',
    borderRightWidth: 1.5,
    borderRightColor: 'rgba(24, 90, 157, .5)',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(24, 90, 157, .5)',
    height: 60,
    marginLeft: -50
  },
  currencyPriceLabel: {
    marginLeft: 5,
    marginTop: 5
  },
  secondPaymentColumn: {
    borderStyle: 'solid',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(24, 90, 157, .5)',
    height: 60,
    marginRight: -50
  },
  depositWallet: {
    alignItems: 'flex-start',
    marginLeft: 40,
    borderBottomColor: 'rgba(24, 90, 157, .5)',
    borderBottomWidth: 1,
  }
});
