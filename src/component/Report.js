import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Dimensions, SafeAreaView, StyleSheet, Text, View,Image, TouchableOpacity } from "react-native";
const { screenWidth, screenHeight } = Dimensions.get('window');

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mCountryCode: "44",
      mCountryName : 'United Kingdom'
    };
  }
 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Self Report</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      infoByCountry : state.homeReducers
  }
}
const mapDispatchToProps = (dispatch) => {

  return {
      requestFetchInfo: searchParam => dispatch(fetchInfoByCountry(searchParam)),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebe8e8",
  },
  headerView : {
    width : screenWidth,
    height : 50,
    backgroundColor : 'white',
    justifyContent : 'center',
    alignItems : 'center'
  },
  headerText : {
    color: "#00918A",
    fontSize : 22,
    fontWeight : '600',
  }  

});
export default connect(mapStateToProps, mapDispatchToProps)(Report);