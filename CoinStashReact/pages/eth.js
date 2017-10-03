/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
'use strict';
import React, { Component } from 'react';

import { Header } from 'react-native-elements';
import RSSFeed from '../NavComponent/RSSFeed';
import EthereumTweets from '../NavComponent/EthereumTweets';
import {
  Button,
  ButtonGroup,
  FormLabel,
  FormInput
  } from 'react-native-elements';
import { StackNavigator} from 'react-navigation';
import buyETHForm from './forms/buyETHForm';
import sellETHForm from './forms/sellETHForm';
import { BackToHomeBTN } from '../NavComponent/BackToHomeBTN';
// import TopNewsMarquee from '../NavComponent/TopNewsMarquee'


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

class eth extends Component {
  constructor() {
    super();
    this.state = {
      ethereumPrice: "",
      ethereumYdayPrice: ""
    };
  }

  getCurrentPrice = () => {
    fetch('https://api.lionshare.capital/api/prices')
    .then(function(response) {
      return response.json()
    })
    .then((obj) => {
      this.setState({ethereumPrice: obj.data.ETH[obj.data.ETH.length - 1]})
    })
  }

  getYesterdayPrice = () => {
    fetch('https://www.bitstamp.net/api/v2/ticker/ethusd')
    .then(function(response) {
      return response.json();
    })
    .then((obj => {
      this.setState({ethereumYdayPrice: obj.open})
    }))
  }
  componentDidMount() {
    this.getCurrentPrice()
    setInterval(this.getCurrentPrice, 100000);
    this.getYesterdayPrice()
    setInterval(this.getYesterdayPrice, 100000);

    let today = this.state.ethereumPrice
    let yday = Math.round(this.state.ethereumYdayPrice)
    let diff = this.state.ethereumPrice - this.state.ethereumYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";

  }

  // componentWillUnmount() {
  //   clearInterval()
  // }

  static navigationOptions = {
    title: 'Ethereum',
  };

  render() {
    let yday = Math.round(this.state.ethereumYdayPrice)
    let diff = this.state.ethereumPrice - this.state.ethereumYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";

    const { navigate } = this.props.navigation;
    return (


        <View style={styles.container}>
          <View style={{marginTop: 30, flexDirection: 'row'}}>
            <BackToHomeBTN navigate={navigate} />
            <Text style={styles.coinPriceTitle}>ETH</Text>
            <Text
              style={{color: 'rgba(1,1,1,0)', paddingLeft: 15, paddingRight: 15}}>
              BACK
            </Text>


          </View>

          <Text style={styles.coinPriceText}>
            {`$${this.state.ethereumPrice}`}{'\n'}
            <Text style={styles.yDay}>Yesterday EOD: ${this.state.ethereumYdayPrice}</Text>
          </Text>

          <Text style={styles.yDayPrice}>
            <Text style={{color: colorBool}}>
              Daily Change: ${change}
            </Text>
          </Text>

          <Text style={{fontSize: 20, paddingTop: 15, paddingBottom: 5}}>
            ETH Feed:
          </Text>

          <ScrollView>
          <RSSFeed />
          <Text>
            Ethereum Tweets
          </Text>
          <EthereumTweets />
          </ScrollView>
          <View style={{flexDirection: 'row'}}>
            <Button
              buttonStyle={{backgroundColor: '#185A9D', borderRadius: 0, marginTop: 0, marginRight: -20, marginLeft: 20, width: "100%"}}
              textStyle={{textAlign: 'center'}}
              title={`BUY`}
              onPress={()=> navigate('buyETHForm')}
              />
            <Button
              buttonStyle={{backgroundColor: '#185A9D', borderRadius: 0, marginTop: 0, marginLeft: -20, width: "100%"}}
              textStyle={{textAlign: 'center'}}
              title={`SELL`}
              onPress={()=> navigate('sellETHForm')}
              />
          </View>
        </View>
    );
  }
}

const ethNav = StackNavigator({
  selfETH: {
    screen: eth
  },
  buyETHForm: {
    screen: buyETHForm,
    navigationOptions: {
      title: 'Buy ETH',
      headerBackTitle: 'ETH'
    }
  },
  sellETHForm: {
    screen: sellETHForm,
    navigationOptions: {
      title: 'Sell ETH',
      headerBackTitle: 'ETH'
    }
  }
},
{
  initialRouteName: 'selfETH'
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

export default ethNav;
