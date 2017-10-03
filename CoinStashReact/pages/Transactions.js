'use strict';
import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation';
import { Button, ButtonGroup, FormLabel, FormInput } from 'react-native-elements';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { ListItem, Thumbnail, Body } from 'native-base';

class Transactions extends Component {
  constructor() {
    super();
    this.state = {
      transactions: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/coinbases/transactions')
    .then(function(response){
      return response.json();
    }).then((obj) => {
      this.setState({transactions: obj})
    })
  }

  render() {
    return (

      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.transactionTitle}>Transaction History</Text>
        </View>
        {this.state.transactions.map((trans, i) =>
          <View style={styles.transactionsContainer}>
            <View style={styles.index}><Text style={styles.index}>{i+1}</Text></View>
            <ListItem>
                <Body>
                  <View style={styles.nameContainer}>
                    <View>
                      <Text style={styles.amount}>Amount: {trans.amount.amount} {trans.amount.currency}</Text>
                      <Text style={styles.usdAmt}>USD Eq.: ${trans.native_amount.amount} {trans.native_amount.currency} </Text>
                    </View>
                    <View style={styles.status}>
                      <Text style={styles.type}>Type: {trans.type}</Text>
                      <Text style={styles.status}>Status: {trans.status}</Text>
                    </View>
                  </View>
                  <View style={styles.date}>
                    <Text style={styles.createdAt}>Date: {trans.created_at}</Text>

                  </View>
                </Body>
            </ListItem>
          </View>
      )}
    </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  transactionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  nameContainer: {
    flexDirection: 'row'
  },
  date: {
    alignItems: 'center'
  },
  index: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  usdAmt: {
    fontWeight: 'bold'
  },
  status: {
    // textAlign: 'right',
    fontWeight: '300',
    paddingLeft: 10
  },
  createdAt: {
    fontWeight: '200'
  },
  amount: {
    fontWeight: '300'
  }
});

export default Transactions;
