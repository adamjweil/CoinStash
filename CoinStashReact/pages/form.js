/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import { Button, ButtonGroup, FormLabel, FormInput } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
// var MarqueeLabel = require('@remobile/react-native-marquee-label');

export default class form extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 2,
      text: 'Useless Placeholder'
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }


  componentDidMount() {
  }

  static navigationOptions = {
    title: 'Form',
  };

  render() {
    const { navigate } = this.props.navigation;
    const buttons = ['BTC', 'ETH', 'LTC']
    const { selectedIndex } = this.state
    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 100}} />

        <FormLabel>Name</FormLabel>
        <FormInput />



        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={styles.flexDirectionColumn}>
          <TextInput
            keyboardType={'numeric'}
            style={{height: 40, borderColor: 'red', borderWidth: 1, backgroundColor: 'blue', width: 100}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
            <Text>
                Column 1
            </Text>
          </View>
          <View style={styles.flexDirectionColumn}>
            <Text>
              Column 2
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
  ,
  flexDirectionColumn: {
      flexDirection: 'column',
      backgroundColor: '#eee',
      width: 185,
      alignItems: 'center',
  },
});


AppRegistry.registerComponent('form', () => form);
