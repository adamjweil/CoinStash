/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';

import { Header } from 'react-native-elements';
import RSSFeed from '../NavComponent/RSSFeed';
import TweetsComponent from '../NavComponent/TweetsComponent';
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
  ScrollView,
  Image
} from 'react-native';

class ltc extends Component {
  constructor() {
    super();
    this.state = {
      liteCoinPrice: "",
      liteCoinYdayPrice: "",
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
      fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + yday)
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        let yday = obj.LTC.USD;
        // console.log(yday);
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.LTC.USD;
          let todayNum = Math.floor(today)
          let yDayCalcLTC = today - yday
          let yDayLTC = yDayCalcLTC.toFixed(2);
          console.log(todayNum)
          this.setState({prevPriceNum: yDayLTC });
        })
      })
    }
    else if (this.state.selectedIndex === 1) {
      let d = new Date();
      let lWeek = Math.floor(d.setDate(d.getDate() - 7) / 1000);
      this.setState({prevPriceString: "Weekly Change: "})
      fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + lWeek)
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        let lWeek = obj.LTC.USD;
        console.log(lWeek);
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.LTC.USD;
          let todayNum = Math.floor(today)
          let lWeekCalcLTC = todayNum - lWeek
          let lWeekLTC = lWeekCalcLTC.toFixed(2);
          console.log(lWeekLTC)
          this.setState({prevPriceNum: lWeekLTC });
        })
      })
    }
    else if (this.state.selectedIndex === 2) {
      let d = new Date();
      let lMonth = Math.floor(d.setMonth(d.getMonth() - 1) / 1000);
      this.setState({prevPriceString: "Monthly Change: "})
      fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + lMonth)
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        let lMonth = obj.LTC.USD;
        console.log(lMonth);
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.LTC.USD;
          let todayNum = Math.floor(today)
          let lMonthCalcLTC = todayNum - lMonth
          let lMonthLTC = lMonthCalcLTC.toFixed(2);
          console.log(lMonthLTC)
          this.setState({prevPriceNum: lMonthLTC });
        })
      })
    }
    else if (this.state.selectedIndex === 3) {
      let d = new Date();
      let lYear = Math.floor(d.setFullYear(d.getFullYear() - 1) / 1000);
      this.setState({prevPriceString: "Yearly Change: "})
      fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + lYear)
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        let lYear = obj.LTC.USD;
        console.log(lYear);
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.LTC.USD;
          let todayNum = Math.floor(today)
          let lYearCalcLTC = todayNum - lYear
          let lYearLTC = lYearCalcLTC.toFixed(2);
          console.log(lYearLTC)
          this.setState({prevPriceNum: lYearLTC });
        })
      })
    }
  }

  getCurrentPrice = () => {
    fetch('https://api.lionshare.capital/api/prices')
    .then(function(response) {
      return response.json()
    }).then((obj) => {
      this.setState({liteCoinPrice: obj.data.LTC[obj.data.LTC.length - 1]})
    })
  }

  componentDidMount() {
    this.getCurrentPrice()
    setInterval(this.getCurrentPrice, 100000);
    this.updateIndex()
    setInterval(this.updateIndex, 100000);

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

    const { liteCoinPrice, liteCoinYdayPrice } = this.state
    const { navigate } = this.props.navigation;
    const buttons = ['Daily', 'Weekly', 'Monthly', 'Yearly']
    const { selectedIndex } = this.state
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
          {`$${this.state.liteCoinPrice}`}
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
            buttonStyle={{backgroundColor: '#185A9D', borderRadius: 0, marginTop: 0, marginRight: -20, marginLeft: 20, width: "100%"}}
            textStyle={{textAlign: 'center'}}
            title={`BUY`}
            onPress={()=> navigate('buyLTCForm')}
            />
          <Button
            raised
            buttonStyle={{backgroundColor: '#185A9D', borderRadius: 0, marginTop: 0, marginLeft: -20, width: "100%"}}
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
