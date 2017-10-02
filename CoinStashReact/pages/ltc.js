/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';

import { Header } from 'react-native-elements';
import RSSFeed from '../NavComponent/RSSFeed';
import LiteCoinTweets from '../NavComponent/LiteCoinTweets'
import { Button, ButtonGroup, FormLabel, FormInput } from 'react-native-elements';
import { StackNavigator} from 'react-navigation';
import buyLTCForm from './forms/buyLTCForm';
import sellLTCForm from './forms/sellLTCForm';
import { BackToHomeBTN } from '../NavComponent/BackToHomeBTN';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

class ltc extends Component {
  constructor() {
    super();
    this.state = {
      liteCoinPrice: "",
      liteCoinYdayPrice: ""
    };
  }

  getCurrentPrice = () => {
    fetch('https://api.lionshare.capital/api/prices')
    .then(function(response) {
      return response.json()
    }).then((obj) => {
      this.setState({liteCoinPrice: obj.data.LTC[obj.data.LTC.length - 1]})
    })
  }

  getYesterdayPrice = () => {
    fetch('https://www.bitstamp.net/api/v2/ticker/ltcusd')
    .then(function(response) {
      return response.json();
    })
    .then((obj => {
      this.setState({liteCoinYdayPrice: obj.open})
    }))
  }

  componentDidMount() {
    this.getCurrentPrice()
    setInterval(this.getCurrentPrice, 100000);
    this.getYesterdayPrice()
    setInterval(this.getYesterdayPrice, 100000);

    let today = this.state.liteCoinPrice
    let yday = Math.round(this.state.liteCoinYdayPrice)
    let diff = this.state.liteCoinPrice - this.state.liteCoinYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";
  }

  // componentWillUnmount() {
  //   clearInterval()
  // }

  static navigationOptions = {
    title: 'LiteCoin',
  };

  render() {
    let today = this.state.liteCoinPrice
    let yday = Math.round(this.state.liteCoinYdayPrice)
    let diff = this.state.liteCoinPrice - this.state.liteCoinYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{marginTop: 30, flexDirection: 'row'}}>
          <BackToHomeBTN navigate={navigate} />
          <Text style={styles.coinPriceTitle}>LTC</Text>
          <Text
            style={{color: 'rgba(1,1,1,0)', paddingLeft: 15, paddingRight: 15}}>
            BACK
          </Text>
        </View>

        <Text style={styles.coinPriceText}>
          {`$${this.state.liteCoinPrice}`}{'\n'}
          <Text style={styles.yDay}>Yesterday EOD: ${this.state.liteCoinYdayPrice}</Text>
        </Text>

        <Text style={styles.yDayPrice}>
          <Text style={{color: colorBool}}>
            Daily Change: ${change}
          </Text>
        </Text>

        <Text style={{fontSize: 20, paddingTop: 15, paddingBottom: 5}}>
          LTC Feed:
        </Text>

        <ScrollView>
        <RSSFeed />
        <Text>
          LiteCoin Tweets
        </Text>
        <LiteCoinTweets />
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Button
            raised
            buttonStyle={{backgroundColor: '#185A9D', borderRadius: 2, marginTop: 10, marginLeft: 15, width: 200}}
            textStyle={{textAlign: 'center'}}
            title={`BUY`}
            onPress={()=> navigate('buyLTCForm')}
            />
          <Button
            raised
            buttonStyle={{backgroundColor: '#185A9D', borderRadius: 2, marginTop: 10, marginRight: 15, width: 200}}
            textStyle={{textAlign: 'center'}}
            title={`SELL`}
            onPress={()=> navigate('sellLTCForm')}
            />
        </View>
      </View>
    );
  }
}

const ltcNav = StackNavigator({
  selfLTC: {
    screen: ltc
  },
  buyLTCForm: {
    screen: buyLTCForm,
    navigationOptions: {
      title: 'Buy LTC',
      headerBackTitle: 'LTC'
    }
  },
  sellLTCForm: {
    screen: sellLTCForm,
    navigationOptions: {
      title: 'Sell LTC',
      headerBackTitle: 'LTC'
    }
  }
},
{
  initialRouteName: 'selfLTC'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  coinPriceTitle: {
    flex: 1,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  coinPriceText: {
    fontSize: 30,
    textAlign: 'center'
  },
  yDay: {
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
});

export default ltcNav;
