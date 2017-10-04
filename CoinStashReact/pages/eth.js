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

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

class eth extends Component {
  constructor() {
    super();
    this.state = {
      ethereumPrice: "",
      ethereumYdayPrice: "",
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
      fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + yday)
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        let yday = obj.ETH.USD;
        // console.log(yday);
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.ETH.USD;
          let todayNum = Math.floor(today)
          let yDayCalcETH = today - yday
          let yDayETH = yDayCalcETH.toFixed(2);
          console.log(todayNum)
          this.setState({prevPriceNum: yDayETH });
        })
      })
    }
    else if (this.state.selectedIndex === 1) {
      let d = new Date();
      let lWeek = Math.floor(d.setDate(d.getDate() - 7) / 1000);
      this.setState({prevPriceString: "Weekly Change: "})
      fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + lWeek)
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        let lWeek = obj.ETH.USD;
        console.log(lWeek);
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.ETH.USD;
          let todayNum = Math.floor(today)
          let lWeekCalcETH = todayNum - lWeek
          let lWeekETH = lWeekCalcETH.toFixed(2);
          console.log(lWeekETH)
          this.setState({prevPriceNum: lWeekETH });
        })
      })
    }
    else if (this.state.selectedIndex === 2) {
      let d = new Date();
      let lMonth = Math.floor(d.setMonth(d.getMonth() - 1) / 1000);
      this.setState({prevPriceString: "Monthly Change: "})
      fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + lMonth)
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        let lMonth = obj.ETH.USD;
        console.log(lMonth);
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.ETH.USD;
          let todayNum = Math.floor(today)
          let lMonthCalcETH = todayNum - lMonth
          let lMonthETH = lMonthCalcETH.toFixed(2);
          console.log(lMonthETH)
          this.setState({prevPriceNum: lMonthETH });
        })
      })
    }
    else if (this.state.selectedIndex === 3) {
      let d = new Date();
      let lYear = Math.floor(d.setFullYear(d.getFullYear() - 1) / 1000);
      this.setState({prevPriceString: "Yearly Change: "})
      fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + lYear)
      .then(function(response) {
        return response.json();
      }).then((obj) => {
        let lYear = obj.ETH.USD;
        console.log(lYear);
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.ETH.USD;
          let todayNum = Math.floor(today)
          let lYearCalcETH = todayNum - lYear
          let lYearETH = lYearCalcETH.toFixed(2);
          console.log(lYearETH)
          this.setState({prevPriceNum: lYearETH });
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
      this.setState({ethereumPrice: obj.data.ETH[obj.data.ETH.length - 1]})
    })
  }

  componentDidMount() {
    this.getCurrentPrice()
    setInterval(this.getCurrentPrice, 100000);
    this.updateIndex()
    setInterval(this.updateIndex, 100000);

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

    const { ethereumPrice, ethereumYdayPrice } = this.state
    const { navigate } = this.props.navigation;
    const buttons = ['Daily', 'Weekly', 'Monthly', 'Yearly']
    const { selectedIndex } = this.state
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
            {`$${this.state.ethereumPrice}`}
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
