/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

'use strict';
import React, { Component } from 'react';

import { Header } from 'react-native-elements';
import TweetsComponent from '../NavComponent/TweetsComponent';
import BitCoinTweets from '../NavComponent/BitCoinTweets';
import { Button, ButtonGroup, FormLabel, FormInput } from 'react-native-elements';
import { StackNavigator} from 'react-navigation';
import buyBTCForm from './forms/buyBTCForm';
import sellBTCForm from './forms/sellBTCForm';
import { BackToHomeBTN } from '../NavComponent/BackToHomeBTN';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

class btc extends Component {
  constructor() {
    super();
    this.state = {
      bitcoinPrice: "",
      bitcoinYdayPrice: "",
      selectedIndex: 0,
      prevPriceString: "",
      prevPriceNum: ""
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    if (this.state.selectedIndex === 0){
      let d = new Date();
      let yday = Math.floor(d.setDate(d.getDate() - 1) / 1000);
      this.setState({prevPriceString: "Daily Change: "})
      fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + yday)
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        let yday = obj.BTC.USD;
        // console.log(yday);
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.BTC.USD;
          let todayNum = Math.floor(today)
          let yDayCalcBTC = today - yday
          let yDayBTC = yDayCalcBTC.toFixed(2);
          console.log(todayNum)
          this.setState({prevPriceNum: yDayBTC });
        })
      })
    }
    else if (this.state.selectedIndex === 1) {
      let d = new Date();
      let lWeek = Math.floor(d.setDate(d.getDate() - 7) / 1000);
      this.setState({prevPriceString: "Weekly Change: "})
      fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + lWeek)
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        let lWeek = obj.BTC.USD;
        console.log(lWeek);
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.BTC.USD;
          let todayNum = Math.floor(today)
          let lWeekCalcBTC = todayNum - lWeek
          let lWeekBTC = lWeekCalcBTC.toFixed(2);
          console.log(lWeekBTC)
          this.setState({prevPriceNum: lWeekBTC });
        })
      })
    }
    else if (this.state.selectedIndex === 2) {
      let d = new Date();
      let lMonth = Math.floor(d.setMonth(d.getMonth() - 1) / 1000);
      this.setState({prevPriceString: "Monthly Change: "})
      fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + lMonth)
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        let lMonth = obj.BTC.USD;
        console.log(lMonth);
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.BTC.USD;
          let todayNum = Math.floor(today)
          let lMonthCalcBTC = todayNum - lMonth
          let lMonthBTC = lMonthCalcBTC.toFixed(2);
          console.log(lMonthBTC)
          this.setState({prevPriceNum: lMonthBTC });
        })
      })
    }
    else if (this.state.selectedIndex === 3) {
      let d = new Date();
      let lYear = Math.floor(d.setFullYear(d.getFullYear() - 1) / 1000);
      this.setState({prevPriceString: "Yearly Change: "})
      fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + lYear)
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        let lYear = obj.BTC.USD;
        console.log(lYear);
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.BTC.USD;
          let todayNum = Math.floor(today)
          let lYearCalcBTC = todayNum - lYear
          let lYearBTC = lYearCalcBTC.toFixed(2);
          console.log(lYearBTC)
          this.setState({prevPriceNum: lYearBTC });
        })
      })
    }
  }

  getCurrentPrice = () => {
    fetch('https://api.lionshare.capital/api/prices')
    .then(function(response) {
      return response.json()
    })
    .then((obj) => {
      this.setState({bitcoinPrice: obj.data.BTC[obj.data.BTC.length - 1]})
    })
  }

  getYesterdayPrice = () => {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday')
    .then(function(response) {
      return response.json();
    })
    .then((obj) => {
      let o = JSON.stringify(obj.bpi)
      let split = o.split(":")
      let yDay = split[1]
      let choppedYdayPrice = yDay.substring(0, yDay.length - 1);

      this.setState({bitcoinYdayPrice: choppedYdayPrice})
    })
  }

  componentDidMount() {
    this.getCurrentPrice()
    setInterval(this.getCurrentPrice, 10000);
    this.getYesterdayPrice()
    setInterval(this.getYesterdayPrice, 10000);

    let today = this.state.bitcoinPrice
    let yday = Math.round(this.state.bitcoinYdayPrice)
    let diff = this.state.bitcoinPrice - this.state.bitcoinYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";

  }

  // componentWillUnmount() {
  //   clearInterval()
  // }
  static navigationOptions = {
    header: null,
    title: 'BTC'
  }

  render() {
    let yday = Math.round(this.state.bitcoinYdayPrice)
    let diff = this.state.bitcoinPrice - this.state.bitcoinYdayPrice
    let change = diff.toFixed(2);
    let colorBool = (change >= 0) ? "green" : "red";

    const { bitcoinPrice, bitcoinYdayPrice } = this.state
    const { navigate } = this.props.navigation;
    const buttons = ['Daily', 'Weekly', 'Monthly', 'Yearly']
    const { selectedIndex } = this.state

    return (

      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <BackToHomeBTN navigate={navigate} />
          <Text style={styles.coinPriceTitle}>BTC</Text>
          <Text
            style={{color: 'rgba(1,1,1,0)', paddingLeft: 15, paddingRight: 15}}>
            BACK
          </Text>
        </View>

        <Text style={styles.coinPriceText}>
          {`$${this.state.bitcoinPrice}`}
        </Text>

        <Text style={styles.yDayPrice}>
          <Text style={{color: colorBool}}>
            {this.state.prevPriceString} {`$${this.state.prevPriceNum}`}
          </Text>
        </Text>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 30}}
         />

        <Text style={{fontSize: 20, paddingTop: 15, paddingBottom: 5}}>
          BTC Feed:
        </Text>

        <ScrollView>
          <BitCoinTweets />
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Button
            buttonStyle={{backgroundColor: '#185A9D', borderRadius: 0, marginTop: 0, marginRight: -20, marginLeft: 20, width: "100%"}}
            textStyle={{textAlign: 'center'}}
            title={`BUY`}
            onPress={()=> navigate('buyBTCForm')}
            />
          <Button
            buttonStyle={{backgroundColor: '#185A9D', borderRadius: 0, marginTop: 0, marginLeft: -20, width: "100%"}}
            textStyle={{textAlign: 'center'}}
            title={`SELL`}
            onPress={()=> navigate('sellBTCForm')}
            />
        </View>
      </View>
    );
  }
}

const btcNav = StackNavigator({
  selfBTC: {
    screen: btc
  },
  buyBTCForm: {
    screen: buyBTCForm,
    navigationOptions: {
      title: 'Buy BTC',
      headerBackTitle: 'BTC'
    }
  },
  sellBTCForm: {
    screen: sellBTCForm,
    navigationOptions: {
      title: 'Sell BTC',
      headerBackTitle: 'BTC'
    }
  }
},
{
  initialRouteName: 'selfBTC'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
    fontSize: 17,
    textAlign: 'center'
  }
});

export default btcNav;
