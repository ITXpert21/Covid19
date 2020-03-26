import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import { 
  Dimensions, 
  SafeAreaView, 
  StyleSheet, 
  Text, View,Image,  
  TouchableOpacity,
  ActivityIndicator, FlatList } from "react-native";

import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay'; 
import { ListItem, List} from 'react-native-elements';
import * as NavigationService from '../services/NavigationService'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const myNewsApiKey = '16c3f85835ef41a0a7416f8d664d85f9';
const feedApiUrl = 'http://newsapi.org/v2/everything?q=corona&language=en&sortBy=publishedAt&q_in_title=corona&pagesize=';
// var offset = 0;
// var scrolldown = false;

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      serverData: [],
      fetching_from_server: false,
    };
    this.page = 1;
    this.pagesize = 5;
  }

  componentDidMount() {
    fetch(feedApiUrl + this.pagesize + '&page=' + this.page + '&apiKey=' + myNewsApiKey)
      .then(response => response.json())
      .then(responseJson => {
        
        this.page = this.page + 1;
        this.setState({
          serverData: [...this.state.serverData, ...responseJson.articles],
          loading: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  loadMoreData = () => {
    this.setState({ fetching_from_server: true }, () => {
      fetch(feedApiUrl + this.pagesize + '&page=' + this.page + '&apiKey=' + myNewsApiKey)
        .then(response => response.json())
        .then(responseJson => {
          this.page = this.page + 1;
          this.setState({
            serverData: [...this.state.serverData, ...responseJson.articles],
            fetching_from_server: false,
          });
        })
        .catch(error => {
          console.error(error);
        });
    });
  };


  onItemClickHandler(url){
    console.log(this.props.navigation);
    // this.props.navigation.navigate(
    //   'Submit'
    // );

  }
  renderFooter() {
    return (
    //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {this.state.fetching_from_server ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {!this.state.loading &&
         <View style={styles.headerView}>
           <View style={styles.headerTextView}>
             <Text style={styles.headerText}>Feed</Text>
           </View>
         </View> 
        }         
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={{ width: '100%' }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.serverData}
            renderItem={({ item, index }) => (
              <ListItem
                roundAvatar
                title={item.title}
                titleStyle={styles.newsTitle}
                onPress={() => { NavigationService.navigate('NewsView', {url : item.url}); }}
                subtitle={
                  <View>
                    <Text style={styles.subTitle1}>{item.url.split('/')[2]}</Text>  
                    <Text style={styles.subTitle2}>{item.description}</Text>  
                  </View>
                }
                containerStyle={styles.listContainer}
                rightAvatar={
                  <Image source={require('../assets/imgs/covid_feed.png')} style={styles.listImg}></Image>
                }
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={this.renderFooter.bind(this)}
            //Adding Load More button as footer component
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: "#ebe8e8",
  },
  headerView : {
    flexDirection : 'row',
    width : screenWidth,
    height : 50,
    // backgroundColor : 'white',
    alignItems : 'center'
  },
  headerTextView : {
    width : '100%',
    alignItems : 'center',
    justifyContent : 'center'

  },
  headerText : {
    color: "#00918A",
    fontSize : 22,
    fontWeight : '600',

  },    
  item: {
    padding: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#00918A',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  newsTitle : {
    fontSize : 16,
    fontWeight : '500'
  },
  subTitle1 : {
    fontSize : 16,
    color: "#00918A",
  }, 
  subTitle2 : {
    fontSize : 14,
    color : '#7a7a7a'
  }, 
  listContainer : {
    borderBottomWidth : 1,
  },    
  listImg : {
    width : 50,
    height : 50,
  },    
});
