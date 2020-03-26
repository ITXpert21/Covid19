import React, {Component} from 'react';
import {connect} from 'react-redux';
import { SafeAreaView, StyleSheet, Share, Text, View,Image, TouchableOpacity } from "react-native";
import CountryPicker from "../../node_modules/rn-country-picker/src/CountryPicker/CountryPicker";
import { ListItem} from 'react-native-elements';
import {fetchInfoByCountry, fetchInfoFromFirebase} from '../action'
import * as NavigationService from '../services/NavigationService'
import {getCode, getName} from 'country-list';
import { database } from "../config/firebase";
import Icon from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay'; 

var symptomatic_var = 0;
var asymptomatic_var = 0;
var positive_var = 0;

class Home extends Component {
  spinner = false;

  constructor(props) {
    super(props);
    this.state = {
      mCountryCode: "44",
      mCountryName : 'United Kingdom',
      symptomatic : 0,
      asymptomatic : 0,
      positive : 0,
  }    

    this.props.requestFetchInfo({countryname : this.state.mCountryName});
  }

  componentDidMount() {
   // this.spinner = true;
    this.getInfoFromFirebase(this.state.mCountryName);
  }

  getInfoFromFirebase(currentCountry){
    symptomatic_var = 0;
    asymptomatic_var = 0;
    positive_var = 0;
    console.log('2222', currentCountry);
    database.ref('/reports').orderByValue().once("value", reports=>{
      reports.forEach(function(report){
        if(report.val().country == 'UK')
          report.val().country = 'United Kingdom';

        if(report.val().country == currentCountry){  
          

          if(report.val().haveSymptomatic == 'yes')
            symptomatic_var = symptomatic_var+ 1;

          if(report.val().haveSymptomatic == 'no')
            asymptomatic_var = asymptomatic_var+ 1;

          if(report.val().positive == 'yes')
            positive_var = positive_var+ 1;
        }  

      })
      this.setState({symptomatic : symptomatic_var});
      this.setState({asymptomatic : asymptomatic_var});
      this.setState({positive : positive_var});
    });
  }
  _selectedValue = index => {
   // this.spinner = true;

    this.setState({ mCountryName: index });
    console.log('selected country', index);

    this.getInfoFromFirebase(index);
     this.props.requestFetchInfo({countryname : index});
     console.log("selected countru", this.props.infoByCountry);

  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message : 'That is for testing. We will have to change this url.',
        url : 'https://app.developer.here.com/coronavirus/'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }; 
 
  render() {
    // if(this.props.infoByCountry.loaded)
    //   this.spinner = false;
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.countryView}>
        <CountryPicker
          disable={false}
          animationType={'slide'}
          containerStyle={styles.pickerStyle}
          pickerTitleStyle={styles.pickerTitleStyle}
          dropDownImage={require("../assets/imgs/res/ic_drop_down.png")}
          selectedCountryTextStyle={styles.selectedCountryTextStyle}
          countryNameTextStyle={styles.countryNameTextStyle}
          pickerTitle={"Country Picker"}
          searchBarPlaceHolder={"Search......"}
          hideCountryFlag={false}
          hideCountryCode={false}
          searchBarStyle={styles.searchBarStyle}
          backButtonImage={require("../assets/imgs/res/ic_back_black.png")}
          searchButtonImage={require("../assets/imgs/res/ic_search.png")}
          countryCode={this.state.mCountryName}
          selectedValue={this._selectedValue}
        />
      <TouchableOpacity style={styles.shareView} onPress={this.onShare}>
          <Icon name="share-2"  size={20} style={{color : "#00918A"}}/>
          <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>      

      </View>
      <Spinner
          visible={this.spinner}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        />
  
      <View style={styles.infoView}>
        <View style={styles.infectedView}>
          <Image source={require('../assets/imgs/virus.png')} style={styles.infoImg}></Image>          
          <Text style={styles.infotitle}>Infected</Text>
          {this.props.infoByCountry.loaded && 
          <Text style={styles.infoValue}>{this.props.infoByCountry.receiveInfo.confirmed.value}</Text>
          }

        </View>
        <View style={styles.recoveredView}>
          <Image source={require('../assets/imgs/recovered.png')} style={styles.infoImg}></Image>          
          <Text style={styles.infotitle}>Recoverd</Text>
          {this.props.infoByCountry.loaded && 
          <Text style={styles.infoValue}>{this.props.infoByCountry.receiveInfo.recovered.value}</Text>
          }
        </View>  
        <View style={styles.deadView}>
          <Image source={require('../assets/imgs/dead.png')} style={styles.infoImg}></Image>          
          <Text style={styles.infotitle}>Dead</Text>
          {this.props.infoByCountry.loaded && 
          <Text style={styles.infoValue}>{this.props.infoByCountry.receiveInfo.deaths.value}</Text>
          }
        </View>               
      </View>
      
      <ListItem
        title={
          <Text style={styles.listTitle}>Symptomatic</Text>
        }
        subtitle={
        <Text style={styles.listSubtitle}>{this.state.symptomatic.toString()}</Text>

        }
        containerStyle={styles.listitem}
        leftAvatar={
          <Image source={require('../assets/imgs/symptomatic.png')} style={styles.listImg}></Image>
        }
        /> 
      <ListItem
        title={
          <Text style={styles.listTitle}>Self Reported Positive</Text>
        }
        subtitle={
          <Text style={styles.listSubtitle}>{this.state.positive.toString()}</Text>

        }
        containerStyle={styles.listitem}
        leftAvatar={
          <Image source={require('../assets/imgs/positive.png')} style={styles.listImg}></Image>
        }
        />   
      <ListItem
        title={
          <Text style={styles.listTitle}>Asymptomatic</Text>
        }
        subtitle={
          <Text style={styles.listSubtitle}>{this.state.asymptomatic.toString()}</Text>

        }
        containerStyle={styles.listitem}
        leftAvatar={
          <Image source={require('../assets/imgs/asymptomatic.png')} style={styles.listImg}></Image>
        }
        />   
      <View style={styles.selfReport}> 
        <View>
          <Text style={styles.selfReportText}>Corona Virus infection?</Text>
        </View>
        <TouchableOpacity onPress={() => { NavigationService.navigate('Report'); }}>

        <View style={styles.selfReportBtn}>

            <Text style={{'color' : '#00918A'}}>Self Report</Text>
          
        </View>
        </TouchableOpacity>        
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
  countryView : {
    flexDirection : 'row',
    margin : 30
  },
  shareView : {
    flexDirection : 'row',
    width : '35%',
    height: 40,
    borderColor: "#666666",
    backgroundColor: "white",
    borderRadius : 10,
    marginLeft : 20,
    alignItems: "center",
    justifyContent : 'center'

  },
  shareText : {
    color : '#00918A',
    fontSize : 16,
    fontWeight : '500',
    marginLeft : 10
  },
  pickerTitleStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    flex: 1,
    marginTop: 5,
    fontSize: 15,
    color: "#000"
  },
  pickerStyle: {
    height: 40,
    width: '60%',
    marginBottom:10,
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#666666",
    backgroundColor: "white"
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: "#000",
    textAlign: "right"
  },
 
  countryNameTextStyle: {
    paddingLeft: 10,
    color: "#000",
    textAlign: "right"
  },
 
  searchBarStyle: {
    flex: 1,
    borderRadius: 50,
    borderWidth: 4,
 
    borderColor: "#D3D3D3",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 8,
    marginBottom: 5,
    marginRight: 12,
    paddingLeft: 20,
    paddingRight: 10
  },
  infoView : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
  },
  recoveredView : {
    width : '25%',
    height : 100,
    backgroundColor : '#1ACEC5',
    marginRight : 20,
    borderRadius : 10,
    borderTopRightRadius : 35,

  },
  infectedView : {
    width : '25%',
    height : 100,
    marginRight : 20,
    backgroundColor : '#656EE3',
    borderRadius : 10,
    borderTopRightRadius : 35,

  },
  deadView : {
    width : '25%',
    height : 100,
    backgroundColor : '#FF7777',
    borderRadius : 10,
    borderTopRightRadius : 35,

  },
  infoImg : {
    margin : 10
  },
  infotitle : {
    fontSize : 12,
    color : "white",
    marginLeft : 10

  },
  infoValue : {
    fontSize : 17,
    color : "white",
    fontWeight : '600',
    marginLeft : 10,
    marginTop : 5

  },
  listTitle : {
    color : '#878787',
    fontSize : 20,
    fontWeight : '400',
    marginBottom : 10
  },
  listSubtitle : {
    color : '#525252',
    fontSize : 16,
    fontWeight : '700',
  },
  listitem : {
    marginLeft : 30,
    marginRight : 30,
    marginTop : 10
  },
  listImg : {
    width : 50,
    height : 50,
    marginRight : 20
  },
  selfReport : {
    flexDirection : 'row',
    backgroundColor : '#00918A',
    margin : 30,
    height : 60,
    borderRadius : 10,
    justifyContent : 'center',
    alignItems : 'center'

  },
  selfReportText : {
    color : 'white',
    fontSize : 18,

  },
  selfReportBtn : {
    backgroundColor : 'white',
    width : 100,
    height : 40,
    borderRadius : 20,
    justifyContent : 'center',
    alignItems : 'center',
    marginLeft : 10
  }     

});
export default connect(mapStateToProps, mapDispatchToProps)(Home);