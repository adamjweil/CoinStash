'use strict';
import React, { Component } from 'react';
import { Text } from 'react-native';

export class BackToHomeBTN extends Component {
  render() {
    const { navigate } = this.props
    return(
      <Text
        style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 20}}
        onPress={() => navigate('Home')}>
        BACK
      </Text>
    );
  }
}
