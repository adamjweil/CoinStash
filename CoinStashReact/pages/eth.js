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
import { Button, ButtonGroup, FormLabel, FormInput } from 'react-native-elements';
import { StackNavigator} from 'react-navigation';
import buyETHForm from './forms/buyETHForm';
import sellETHForm from './forms/sellETHForm';
import { BackToHomeBTN } from '../NavComponent/BackToHomeBTN';
import { AppRegistry, StyleSheet, Text, View, ScrollView, Image } from 'react-native';

class eth extends Component {
  constructor() {
    super();
    this.state = {
      ethereumPrice: "",
      ethereumYdayPrice: "",
      selectedIndex: 0,
      prevPriceString: "",
      prevPriceNum: "",
      colorBoolean: ""
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
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.ETH.USD;
          let todayNum = Math.floor(today)
          let yDayCalcETH = today - yday
          let yDayETH = yDayCalcETH.toFixed(2);
          this.setState({prevPriceNum: yDayETH });
          let colorBool = (yDayETH >= 0) ? "green" : "red";
          this.setState({colorBoolean: colorBool})
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
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.ETH.USD;
          let todayNum = Math.floor(today)
          let lWeekCalcETH = todayNum - lWeek
          let lWeekETH = lWeekCalcETH.toFixed(2);
          this.setState({prevPriceNum: lWeekETH });
          let colorBool = (lWeekETH >= 0) ? "green" : "red";
          this.setState({colorBoolean: colorBool})
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
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.ETH.USD;
          let todayNum = Math.floor(today)
          let lMonthCalcETH = todayNum - lMonth
          let lMonthETH = lMonthCalcETH.toFixed(2);
          this.setState({prevPriceNum: lMonthETH });
          let colorBool = (lMonthETH >= 0) ? "green" : "red";
          this.setState({colorBoolean: colorBool})
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
        fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD')
        .then(function(response) {
          return response.json();
        }).then((obj) => {
          let today = obj.ETH.USD;
          let todayNum = Math.floor(today)
          let lYearCalcETH = todayNum - lYear
          let lYearETH = lYearCalcETH.toFixed(2);
          this.setState({prevPriceNum: lYearETH });
          let colorBool = (lYearETH >= 0) ? "green" : "red";
          this.setState({colorBoolean: colorBool})
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
  }

  // componentWillUnmount() {
  //   clearInterval()
  // }

  static navigationOptions = {
    header: null
  };

  render() {

    const { ethereumPrice, ethereumYdayPrice } = this.state
    const { navigate } = this.props.navigation;
    const buttons = ['Daily', 'Weekly', 'Monthly', 'Yearly']
    const { selectedIndex } = this.state
    return (

      <View style={styles.container}>
        <View style={styles.backBTNStyle}>
          <BackToHomeBTN navigate={navigate} />
          <Text style={styles.coinPriceTitle}></Text>
          <Text
            style={{color: 'rgba(1,1,1,0)', paddingLeft: 15, paddingRight: 15}}>
            BACK
          </Text>
        </View>

        <View style={styles.coinHeader}>
          <Text style={styles.coinTitle}>ETH:</Text>
          <Text style={styles.coinPriceText}>
            {`$${this.state.ethereumPrice}`}
          </Text>
        </View>

          <Text style={styles.yDayPrice}>
            <Text style={{color: `${this.state.colorBoolean}`, fontWeight: 'bold'}}>
              {this.state.prevPriceString} {`$${this.state.prevPriceNum}`}
            </Text>
          </Text>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={styles.btnGroupStyle}
          />

        <Text style={styles.feedTitle}>
          ETH Feed:
        </Text>

        <ScrollView>
          <Text style={{color: '#185A9D', textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>
            Ethereum Tweets
          </Text>
          <EthereumTweets />
          <Text style={{color: '#185A9D', textAlign: 'center', fontWeight: 'bold', fontSize: 15, paddingTop: 10, paddingBottom: 5}}>
            Ethereum RSS Feeds
          </Text>
          <RSSFeed />
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Button
            buttonStyle={styles.buySellBtnStyleLeft}
            textStyle={{textAlign: 'center'}}
            title={`BUY`}
            onPress={()=> navigate('buyETHForm')}
            />
          <Button
            buttonStyle={styles.buySellBtnStyleRight}
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
    backgroundColor: '#F5FCFF'
  },
  backBTNStyle: {
    flexDirection: 'row',
    marginTop: 30
    // marginLeft: 0
  },
  btnGroupStyle: {
    height: 50,
    marginTop: 10
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
  },
  feedTitle: {
    fontSize: 20,
    paddingTop: 15,
    paddingBottom: 7
  },
  buySellBtnStyleLeft: {
    backgroundColor: '#185A9D',
    borderRadius: 0,
    marginTop: 0,
    marginRight: -20,
    marginLeft: 20,
    width: "100%"
  },
  buySellBtnStyleRight: {
    backgroundColor: '#185A9D',
    borderRadius: 0,
    marginTop: 0,
    marginRight: 20,
    marginLeft: -20,
    width: "100%"
  },
  coinHeader: {
    flexDirection: 'row'
  },
  coinTitle: {
    fontSize: 20,
    fontWeight: '700',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 6,
    paddingRight: 10
  }
});

export default ethNav;
