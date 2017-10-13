'use strict';
import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements';
import { AppRegistry, StyleSheet, Text, View, ScrollView } from 'react-native';
import { ListItem, Thumbnail, Body } from 'native-base';
import Button from 'apsl-react-native-button'

class TransactionDetails extends Component {
  constructor() {
    super();
    this.state = {
      transactions: []
    };
    this.callFunc = this.callFunc.bind(this)
  }
  componentDidMount() {
    this.getTransactions()
    setInterval(this.getTransactions, 10000);
  }

  callFunc(){
    if(this.transBoolean){
      this.setState({transBoolean: false});
    } else {
      this.setState({transBoolean: true});
    }
  }

  getTransactions = () => {
    fetch('https://coinstache-backend.herokuapp.com/coinbases/transactions')
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
            <ListItem>
                <Body>
                  <View style={styles.nameContainer}>
                    <View>
                      <Text style={styles.amount}>Amount: <Text style={styles.amountValue}>{trans.amount.amount} {trans.amount.currency}</Text></Text>
                      <Text style={styles.usdAmt}>USD Equiv: <Text style={styles.usdAmtValue}>${trans.native_amount.amount} {trans.native_amount.currency}</Text> </Text>
                    </View>
                    <View style={styles.statusContainer}>
                      <Text style={styles.type}>Type: <Text style={styles.typeValue}>{trans.type}</Text></Text>
                      <Text style={styles.status}>Status: <Text style={styles.statusValue}>{trans.status}</Text></Text>
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
  transactionsContainer: {
    width: 350,

  },
  transactionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontWeight: '400'
  },
  nameContainer: {
    flexDirection: 'row',
    paddingLeft: 10
  },
  date: {
    alignItems: 'center',
    marginTop: 5
  },
  index: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  usdAmt: {
    fontWeight: '700',
    color: "#185A9D"
  },
  usdAmtValue: {
    fontWeight: '300',
    color: "#000"
  },
  status: {
    // textAlign: 'right',
    fontWeight: '300',
    paddingLeft: 10,
    fontWeight: '700',
    color: "#185A9D"
  },
  createdAt: {
    fontWeight: '200'
  },
  amount: {
    fontWeight: '700',
    color: "#185A9D"
  },
  amountValue: {
    fontWeight: '300',
    color: "#000"
  },
  type: {
    fontWeight: '700',
    color: "#185A9D"
  },
  typeValue: {
    fontWeight: '300',
    color: "#000"
  },
  statusValue: {
    fontWeight: '300',
    color: "#000"
  },
  statusContainer: {
    alignItems: "flex-end"
  },
  transactionTitle: {
    color: "#185A9D",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 15
  }
});

export default TransactionDetails;
