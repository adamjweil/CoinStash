'use strict';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';


export class BackToHomeBTN extends Component {
  render() {
    const { navigate } = this.props
    return(
      <View
        style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15, color: "#185A9D"}}
        onPress={() => navigate('Home')}>
        <Icon
          name='angle-double-left'
          type='font-awesome'
          color='#000'
          onPress={() => navigate('Home')} />
      </View>

    );
  }
}
