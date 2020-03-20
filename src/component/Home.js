import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Platform, SafeAreaView, StyleSheet, Text, View,Image, TouchableOpacity } from "react-native";
import CountryPicker from "../../node_modules/rn-country-picker/src/CountryPicker/CountryPicker";
import CountryJSON from "../../node_modules/rn-country-picker/src/CountryPicker/countries.json";
import DeviceInfo from "react-native-device-info";
import { ListItem} from 'react-native-elements';
import {fetchInfoByCountry, fetchInfoByCountrySuccess, fetchInfoByCountryFailed, navigatePage} from '../action'
import * as NavigationService from '../services/NavigationService'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mCountryCode: "44",
      mCountryName : 'United Kingdom'
    };
    // let userLocaleCountryCode = "";
    // userLocaleCountryCode = DeviceInfo.getDeviceCountry();
    // try {
    //   if (userLocaleCountryCode) {
    //     const newData = CountryJSON.filter(function(item) {
    //       const itemData = item.name.common.toUpperCase();
    //       const textData = userLocaleCountryCode.toUpperCase();
    //       return itemData.startsWith(textData);
    //     });
    //     console.log("newData1111111111", newData.length);

    //     if (newData.length > 0) {

    //       this.state.mCountryCode = newData[0].callingCode;
    //     } else {
    //       this.setState({ mCountryCode: "44" });
    //     }
    //   } else {
    //     this.setState({ mCountryCode: "44" });
    //   }
    // } catch (e) {
    //   console.error(e.message);
    // }
    this.props.requestFetchInfo({countryname : this.state.mCountryName});

  }

  _selectedValue = index => {
    this.setState({ mCountryName: index });

     this.props.requestFetchInfo({countryname : index});

  };
 
 
  render() {
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
      </View>
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
          <Text style={styles.listSubtitle}>322</Text>

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
          <Text style={styles.listSubtitle}>322</Text>

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
          <Text style={styles.listSubtitle}>322</Text>

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
    margin : 30
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