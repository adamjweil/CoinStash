/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
'use strict';
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { CoinStashReact2 } from './app'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

export default class home extends Component {
  constructor() {
    super();
    this.state = {
      newsFeed0: [],
      newsFeed1: [],
      newsFeed2: [],
      newsFeed3: [],
      newsFeed4: [],
      newsFeed5: [],
      newsFeed6: [],
      newsFeed7: [],
      newsFeed8: []
    };
  }
  getCurrentPrice = () => {
    fetch('https://api.lionshare.capital/api/prices')
    .then(function(response) {
      // debugger
      return response.json()
    }).then((obj) => {
      this.setState({
        bitcoinPrice: obj.data.BTC[obj.data.BTC.length - 1],
        ethereumPrice: obj.data.ETH[obj.data.ETH.length - 1],
        liteCoinPrice: obj.data.LTC[obj.data.LTC.length - 1]})
      })
    }

    getCurrentNews = () => {
      // TechCrunch
      // fetch('https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=ed62d0aea575414fbdf6a1351c0fa66a')
      fetch('https://newsapi.org/v1/articles?source=business-insider&sortBy=latest&apiKey=ed62d0aea575414fbdf6a1351c0fa66a')
      .then(function(response) {
        return response.json();
      })
       .catch((error) => console.warn("fetch error:", error))
       .then((response) => {
        this.setState({newsFeed0: response.articles[response.articles.length - 1]})
        this.setState({newsFeed1: response.articles[response.articles.length - 2]})
        this.setState({newsFeed2: response.articles[response.articles.length - 3]})
        this.setState({newsFeed3: response.articles[response.articles.length - 4]})
        this.setState({newsFeed4: response.articles[response.articles.length - 5]})
        this.setState({newsFeed5: response.articles[response.articles.length - 6]})
        this.setState({newsFeed6: response.articles[response.articles.length - 7]})
        this.setState({newsFeed7: response.articles[response.articles.length - 8]})
        this.setState({newsFeed8: response.articles[response.articles.length - 9]})
      })
    }

    componentDidMount() {
      this.getCurrentNews();
      setInterval(this.getCurrentNews, 10000);
      this.getCurrentPrice();
      setInterval(this.getCurrentPrice, 10000);
    }

    static navigationOptions = {
      header: null,
      title: 'Dashboard',
    };

    render() {
      const { bitcoinPrice } = this.state;
      return (
        <LinearGradient colors={['#43cea2', '#185a9d']} style={styles.linearGradient}>
          <Image source={{uri: 'http://www.freepngimg.com/thumb/mustache/5-2-no-shave-movember-day-mustache-png-image-thumb.png'}}
            style={{width: 125, height: 125, marginLeft: 120, marginBottom: -75}}
            />

          <Text
            style={{color: 'white'}}
            onPress={()=> this.props.navigation.navigate('DrawerOpen')}
            >MENU</Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.navTextContainer} >
              <Text style={styles.navButtons}>
                {`BTC:\n $${this.state.bitcoinPrice}`}
              </Text>
            </Text>
            <View style={{marginHorizontal: 11}}>
              <Text style={styles.navTextContainer} >
                <Text style={styles.navButtons}>
                  {`ETH:\n $${this.state.ethereumPrice}`}
                </Text>
              </Text>
            </View>
            <Text style={styles.navTextContainer} >
              <Text style={styles.navButtons}>
                {`LTC:\n $${this.state.liteCoinPrice}`}
              </Text>
            </Text>
          </View>
          <Text
            style={{textAlign: 'center', color: 'white', fontWeight: 'bold', paddingTop: 20, fontSize: 20}}
            >Latest Cryptocurreny News</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
              <View style={styles.newsPhoto}>
                <Image source={{uri: `${this.state.newsFeed0.urlToImage}`}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed0.title}</Text>
                    <Text style={styles.description}>{this.state.newsFeed0.description}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      title={`READ ME`}
                      />
                  </View>
                </View>
              </View>

              <View style={styles.newsPhoto}>
                <Image source={{uri: `${this.state.newsFeed1.urlToImage}`}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>

                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed1.title}</Text>
                    <Text style={styles.description}>{this.state.newsFeed1.description}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      title={`READ ME`}
                      />
                  </View>
                </View>
              </View>

              <View style={styles.newsPhoto}>
                <Image source={{uri: `${this.state.newsFeed2.urlToImage}`}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed2.title}</Text>
                    <Text style={styles.description}>{this.state.newsFeed2.description}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      title={`READ ME`}
                      />
                  </View>
                </View>
              </View>


              <View style={styles.newsPhoto}>
                <Image source={{uri: `${this.state.newsFeed3.urlToImage}`}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed3.title}</Text>
                    <Text style={styles.description}>{this.state.newsFeed3.description}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      title={`READ ME`}
                      />
                  </View>
                </View>
              </View>


              <View style={styles.newsPhoto}>
                <Image source={{uri: `${this.state.newsFeed4.urlToImage}`}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed4.title}</Text>
                    <Text style={styles.description}>{this.state.newsFeed4.description}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      title={`Read More`}

                      />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',

    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginTop: 40,
      backgroundColor: 'transparent',
    },
    marqeeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    marqueeLabel: {
      marginBottom: 100,
      backgroundColor: 'blue',
      width:400,
      height:50,
    },
    header: {
      marginTop: 10,
      backgroundColor: 'blue',
      width:400,
      height:50,
      fontWeight:'900',
    },
    newsTitle: {
      fontSize: 14,
      color: '#333333',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    newsDescription: {
      fontSize: 12,
      color: '#333333',
      textAlign: 'left',
      fontWeight: '300',
      fontStyle: 'italic',
    },
    newsAuthor: {
      fontSize: 16,
      color: '#333333',
      textAlign: 'center',
    },
    newsWrapper: {
      alignItems: "flex-start",
      backgroundColor: 'lightgray',
      borderColor: 'white',
      borderWidth: 1,
      padding: 10
    },
    linearGradient: {
      paddingLeft: 15,
      paddingRight: 15,
    },
    navButtons: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 20,
      // backgroundColor: "#0A2540"
    },
    navTextContainer: {
      textAlign: 'center',
      borderWidth: 3,
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderColor: 'white'
      // backgroundColor: "rgb(29,78,85)"
    },
    newsItem: {
      flex: 1,
      flexDirection: 'row',
      paddingRight: 22,
      paddingLeft: 22,
      paddingTop: 10,
      paddingBottom: 30,
      marginBottom: 30,
      backgroundColor: 'rgba(0,0,0,.5)',
      shadowColor: '#777',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 2,
      height: 242.5

    },
    newsText: {
      flex: 2,
      flexDirection: 'row',
      padding: 10,
      borderColor: "#EFEFEF",
    },
    number: {
      flex: 0.5,
    },
    text_container: {
      flex: 3
    },
    pretext: {
      color: '#3F3F3F',
      fontSize: 20
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      fontFamily: 'Avenir',
      textAlign: 'center',
      lineHeight: 20,
      marginTop: 10

    },
    newsPhoto: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:-242.5
    },
    photo: {
      width: 345,
      height: 242.5,
      marginTop: 15,
    },
    description: {
      color: "#FFF",
      textAlign: 'center'
    },
    readMoreButtton: {
      borderRadius: 0,
      marginTop: 10,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth:3,
      borderColor: 'white'
    },
    scrollView: {
      marginTop: 15
    }
  });


  AppRegistry.registerComponent('home', () => home);
