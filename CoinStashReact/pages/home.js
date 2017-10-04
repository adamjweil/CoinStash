/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
'use strict';
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

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
  componentDidMount() {
      this.getCurrentNews();
      setInterval(this.getCurrentNews, 100000);
      this.getCurrentPrice();
      setInterval(this.getCurrentPrice, 10000);
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
      fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.bitcoin.com%2Ffeed%2F&api_key=d92ks2w1mac3z34wxbpajfqfhpb6cke3jlxzhagd')
      .then(function(response) {
        return response.json();
      })
       .catch((error) => console.warn("fetch error:", error))
       .then((obj) => {
        this.setState({newsFeed0: obj.items[obj.items.length - 1]})
        this.setState({newsFeed1: obj.items[obj.items.length - 2]})
        this.setState({newsFeed2: obj.items[obj.items.length - 3]})
        this.setState({newsFeed3: obj.items[obj.items.length - 4]})
        this.setState({newsFeed4: obj.items[obj.items.length - 5]})
        this.setState({newsFeed5: obj.items[obj.items.length - 6]})
        this.setState({newsFeed6: obj.items[obj.items.length - 7]})
        this.setState({newsFeed7: obj.items[obj.items.length - 8]})
        this.setState({newsFeed8: obj.items[obj.items.length - 9]})
        })
    }



    static navigationOptions = {
      header: null,
      title: 'Dashboard',
    };

    render() {
      const { bitcoinPrice } = this.state;
      return (
        <LinearGradient colors={['#F5FCFF', '#F5FCFF']} style={styles.linearGradient}>
          <Image source={{uri: 'http://www.freepngimg.com/thumb/mustache/5-2-no-shave-movember-day-mustache-png-image-thumb.png'}}
            style={{width: 125, height: 125, marginLeft: 110, marginBottom: -75}}
            />
          <Text
            style={{color: '#185A9D'}}
            onPress={()=> this.props.navigation.navigate('DrawerOpen')}
            >MENU</Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.navTextContainer} >
              <Text style={styles.navButtons}>
                {`ETH:\n $${this.state.ethereumPrice}`}
              </Text>
            </Text>
            <View style={{marginHorizontal: 11}}>
              <Text style={styles.navTextContainer} >
                <Text style={styles.navButtons}>
                  {`BTC:\n $${this.state.bitcoinPrice}`}
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
            style={{textAlign: 'center', color: '#185A9D', fontWeight: 'bold', paddingTop: 20, fontSize: 20}}
            >Latest Cryptocurreny News</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
              <View style={styles.newsPhoto}>
                <Image source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYJT_XrXsSNRTL4jw6C8aFWGMh3J9ha-z50AK9r-4wGKVWZYTLjw"}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed0.title}</Text>
                    <Text style={styles.description}>posted by{'\n'}{this.state.newsFeed0.author}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      onPress={()=> Linking.openURL(this.state.newsFeed0.link)}
                      title={`READ ME`}
                      />
                  </View>
                </View>
              </View>

              <View style={styles.newsPhoto}>
                <Image source={{uri: "https://bit-media.org/wp-content/uploads/2017/07/graph-163509_1280-800x450.jpg"}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>

                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed1.title}</Text>
                    <Text style={styles.description}>posted by{'\n'}{this.state.newsFeed1.author}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      onPress={()=> Linking.openURL(this.state.newsFeed1.link)}
                      title={`READ ME`}
                      />
                  </View>
                </View>
              </View>

              <View style={styles.newsPhoto}>
                <Image source={{uri: "https://news.bitcoin.com/wp-content/uploads/2017/05/shutterstock_497337487.jpg"}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed2.title}</Text>
                    <Text style={styles.description}>posted by{'\n'}{this.state.newsFeed2.author}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      onPress={()=> Linking.openURL(this.state.newsFeed2.link)}
                      title={`READ ME`}
                      />
                  </View>
                </View>
              </View>


              <View style={styles.newsPhoto}>
                <Image source={{uri: "https://i.ytimg.com/vi/_KrFDXApp5M/maxresdefault.jpg"}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed3.title}</Text>
                    <Text style={styles.description}>posted by{'\n'}{this.state.newsFeed3.author}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      onPress={()=> Linking.openURL(this.state.newsFeed3.link)}
                      title={`READ ME`}
                      />
                  </View>
                </View>
              </View>


              <View style={styles.newsPhoto}>
                <Image source={{uri: "https://cointelegraph.com/images/725_Ly9jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy9iMjI5NGU5NDRkOWQxZWY3NzEzNDRhNzg4OTU3ZTA2Ny5qcGc=.jpg"}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed4.title}</Text>
                    <Text style={styles.description}>posted by{'\n'}{this.state.newsFeed4.author}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      onPress={()=> Linking.openURL(this.state.newsFeed4.link)}
                      title={`Read More`}
                      />
                  </View>
                </View>
              </View>

              <View style={styles.newsPhoto}>
                <Image source={{uri: "https://www.thesun.co.uk/wp-content/uploads/2017/03/nintchdbpict000306226097.jpg?strip=all&w=960"}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed5.title}</Text>
                    <Text style={styles.description}>posted by{'\n'}{this.state.newsFeed5.author}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      onPress={()=> Linking.openURL(this.state.newsFeed5.link)}
                      title={`READ ME`}
                      />
                  </View>
                </View>
              </View>

              <View style={styles.newsPhoto}>
                <Image source={{uri: "https://news.bitpanda.com/wp-content/uploads/2017/07/the-rise-and-rise-of-bitcoin-54b8c08957db0.jpg"}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed6.title}</Text>
                    <Text style={styles.description}>posted by{'\n'}{this.state.newsFeed6.author}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      onPress={()=> Linking.openURL(this.state.newsFeed6.link)}
                      title={`READ ME`}
                      />
                  </View>
                </View>
              </View>

              <View style={styles.newsPhoto}>
                <Image source={{uri: "https://sophosnews.files.wordpress.com/2016/08/bitcoin.png?w=780&h=408&crop=1"}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed7.title}</Text>
                    <Text style={styles.description}>posted by{'\n'}{this.state.newsFeed7.author}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      onPress={()=> Linking.openURL(this.state.newsFeed7.link)}
                      title={`READ ME`}
                      />
                  </View>
                </View>
              </View>

              <View style={styles.newsPhoto}>
                <Image source={{uri: "http://i.huffpost.com/gen/1528575/images/o-BITCOIN-facebook.jpg"}} style={styles.photo} />
              </View>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <View style={styles.text_container}>
                    <Text style={styles.title}>{this.state.newsFeed8.title}</Text>
                    <Text style={styles.description}>posted by{'\n'}{this.state.newsFeed8.author}</Text>
                    <Button
                      fontWeight={"700"}
                      buttonStyle={styles.readMoreButtton}
                      onPress={()=> Linking.openURL(this.state.newsFeed8.link)}
                      title={`READ ME`}
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
    description: {
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
      flex: 1
    },
    navButtons: {
      color: '#185A9D',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600'
      // backgroundColor: "#0A2540"
    },
    navTextContainer: {
      textAlign: 'center',
      paddingHorizontal: 12,
      paddingVertical: 5,

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
