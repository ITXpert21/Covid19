import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Dimensions, SafeAreaView, StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { screenWidth, screenHeight } = Dimensions.get('window');
import SegmentControl from 'react-native-segment-controller';
import * as NavigationService from '../services/NavigationService'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';


class Submit extends Component {
  selectedParams = {
    positive : '',
    haveSymptomatic : ''
  }  

  constructor(props) {
    super(props);
    this.state = {
      reports : this.props.navigation.state.params.navParam
    };
  }



  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
            <View style={styles.backBtnView}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack('')}>
                <Icon name="arrow-left"  size={30} style={{color : "#00918A"}}/>
              </TouchableOpacity>
            </View>
          <View style={styles.headerTextView}>
            <Text style={styles.headerText}>Self Report</Text>
          </View>
        </View>  

        <ScrollView>
        <View style={styles.textinputview}> 
          <Icon name="mail"  size={20} color="#00918A" style={styles.icon}/>
          <TextInput style={styles.textinput} placeholder="Enter your email"
              onChangeText={ email=> this.setState({email})}  
          />
        </View>
        <TouchableOpacity onPress={() => this.Next()}>
          <View style={styles.submitBtn}>
            <Text style={styles.submitText}>Submit Self Report</Text>
          </View>
        </TouchableOpacity> 
        <View style={styles.termsView}>
          <Text style={styles.title}>Welcom to Corona Tracker!</Text>
          <Text style={styles.content}>These terms and conditions outline the rules and regulations for the use of Company Name's Website, located at Website.com.{"\n"}
              By accessing this website we assume you accept these terms and conditions. {"\n"}Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.{"\n"}
              The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. {"\n"}All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as </Text>
        </View>       
        </ScrollView>
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
    flexDirection : 'row',
    width : screenWidth,
    height : 50,
    // backgroundColor : 'white',
    alignItems : 'center'
  },
  headerTextView : {
    width : '80%',
    alignItems : 'center',
    justifyContent : 'center'

  },
  headerText : {
    color: "#00918A",
    fontSize : 22,
    fontWeight : '600',

  },  
  backBtnView : {
    flexDirection : 'row',
    width : '10%',
    height : 40,
    alignItems : 'center',
    justifyContent : 'center'
  },
  textinputview : {
    flexDirection: 'row',
    alignItems : 'center',
    width : screenWidth,
    height: 50,
    margin : 20,
    borderRadius:10,
    borderColor : '#b3b0ad',
    borderWidth : 1,
    backgroundColor : 'white'
  },
  textinput : {
    width : 250,
    height: 60,
  }, 
  icon : {
    marginLeft : 20,
    marginRight : 10
  },
  submitBtn : {
    height : 50,
    marginLeft : 20,
    marginRight : 20,
    backgroundColor : '#00918A',
    borderRadius : 10,
    justifyContent : 'center',
    alignItems : 'center'
  },
  submitText : {
    color : 'white',
    fontSize : 18,
    fontWeight : '600'
  },
  termsView : {
    margin : 20,
    justifyContent : 'center',
    alignItems : 'center',
    

  },
  title : {
    color : '#00918A',
    fontSize : 16,
    fontWeight : '600'
  },
  content : {
    marginTop : 10,
    color : '#5c5c5c',
    fontSize : 14,
    fontWeight : '400',
    lineHeight: 30,
  }           
});
export default connect(mapStateToProps, mapDispatchToProps)(Submit);