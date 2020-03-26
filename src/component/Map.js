
import React, {Component} from 'react';
import { StyleSheet, View, SafeAreaView, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker,  PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import * as RNLocalize from "react-native-localize";
import {countries} from 'country-data';
import {connect} from 'react-redux';
import {fetchConfirmedInfoByCountry, getCurrentLocation} from '../action'
import CountryPicker from "../../node_modules/rn-country-picker/src/CountryPicker/CountryPicker";
import Geocoder from 'react-native-geocoding';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const myApiKey = 'AIzaSyB8nm4Avunu0rENuo2tpWgV8jKUKLFbESw';

 class Map extends Component{
  selectedCountry = countries[RNLocalize.getCountry()].name;

  constructor(props) {
    super(props);
    this.state = {
      marker1: true,
      marker2: false,
      confirmedText : 'confirmed : 2400',
      recoveredText : 'recoverd : 50',
      currentCountry : countries[RNLocalize.getCountry()].name,
      currentMarkers : [],
     
    };


    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
      this.setState({currentLat : location.latitude});
      this.setState({currentLng : location.longitude});
      
      //this.getInfoByCountry(this.state.currentCountry);
    })
    .catch(error => {
        const { code, message } = error;
        console.log('error');
        console.warn(code, message);
    })  
    //this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.props.requestFetchConfirmedInfo({countryname : this.state.currentCountry});
  }

  componentDidMount(){

  }

  
  onRegionChangeComplete(region) {


    if(this.selectedCountry != this.state.currentCountry){
      this.setState({currentCountry : this.selectedCountry});
      this.setState({currentLat : region.latitude});
      this.setState({currentLng : region.longitude});
      this.props.requestFetchConfirmedInfo({countryname : this.selectedCountry});
      console.log("selected another country", this.state.currentCountry);
      return;
      //
    }
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + region.latitude + ',' + region.longitude + '&key=' + myApiKey)
    .then((response) => response.json())
    .then((responseJson) => {

      for(let i=0; i<responseJson.results[0].address_components.length; i++){
        if(responseJson.results[0].address_components[i].types[0] == 'country'){
          this.selectedCountry = responseJson.results[0].address_components[i].long_name;

          break;
        }
      }


    })
  }

  _selectedValue = index => {
    this.setState({ currentCountry: index });
    this.props.requestFetchConfirmedInfo({countryname : this.state.currentCountry});

     Geocoder.init(myApiKey);

     Geocoder.from(index)
      .then(json => {
          var location = json.results[0].geometry.location;
          this.setState({currentLat : location.lat});
          this.setState({currentLng : location.lng});
          this.props.requestFetchConfirmedInfo({countryname : this.state.currentCountry});

      })
      .catch(error => console.warn(error));
  };
  // async makeDataForMarker(results){
  //   Geocoder.init(myApiKey);
  //   const markersData = [];

  //   results.map( data => {
  //     Geocoder.from(data.keyId)
  //     .then(json => {
  //         var location = json.results[0].geometry.location;
  //         data.lat = location.lat;
  //         data.lng = location.lng;
  //         this.state.currentMarkers.push(data)    
  //     })
  //     .catch(error => console.warn(error));      
  //   });

  // }

  render(){
    // if(this.props.infoByCountry.loaded)
    //   this.makeDataForMarker(this.props.infoByCountry.receiveInfo.data.covid19Stats);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Map</Text>  
          {/* <CountryPicker
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
            countryCode={this.state.currentCountry}
            selectedValue={this._selectedValue}
          />       */}

          <View style={styles.info_WHO}>
            <TouchableOpacity>
              <View style={styles.confirmedBtnView}>
                <Image source={require('../assets/imgs/confirmed_btn.png')} />
                <Text style={styles.confirmedText}>WHO Confirmed</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.confirmedBtnView}>
                <Image source={require('../assets/imgs/dead_btn.png')} />
                <Text style={styles.confirmedText}>WHO Deaths</Text>
              </View>
            </TouchableOpacity>            
          </View>
          <View style={styles.info_Self}>
            <TouchableOpacity>
              <View style={styles.symptomaticdBtnView}>
                <Image source={require('../assets/imgs/symptomatic_btn.png')} />
                <Text style={styles.confirmedText}>Symptomatic</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.symptomaticdBtnView}>
                <Image source={require('../assets/imgs/asymptomatic_btn.png')} />
                <Text style={styles.confirmedText}>Asymptomatic</Text>
              </View>
            </TouchableOpacity>  
            <TouchableOpacity>
              <View style={styles.symptomaticdBtnView}>
                <Image source={require('../assets/imgs/positive_btn.png')} />
                <Text style={styles.confirmedText}>Positive</Text>
              </View>
            </TouchableOpacity>                        
          </View>

        </View>
        {this.state.currentLat != undefined && this.state.currentLng != undefined &&
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          //onRegionChangeComplete={this.onRegionChangeComplete}
          initialRegion={{
            latitude: this.state.currentLat,
            longitude: this.state.currentLng,
            latitudeDelta: 25,
            longitudeDelta: 25,
          }}
          region={{
            latitude: this.state.currentLat,
            longitude: this.state.currentLng,
            latitudeDelta: 25,
            longitudeDelta: 25,
          }}
        >
          {this.props.infoByCountry.loaded && this.props.infoByCountry.receiveInfo.map(marker => {
            return(
              <Marker
                title="New York"
                description={this.state.confirmedText + '\n' + this.state.recoveredText}
                onPress={() => this.setState({ marker1: !this.state.marker1 })}
                coordinate={{
                  latitude: marker.lat,
                  longitude: marker.long,
                }}
                // centerOffset={{ x: -18, y: -60 }}
                // anchor={{ x: 0.69, y: 1 }}
                //image={flagPinkImg}
              >
              {
                
                
                marker.confirmed > 0 && 
                  <Image source={require('../assets/imgs/confirm_pin.png')} style={{height: 30, width:30 }} />
              }  
              {
                marker.deaths > 0 && 
                  <Image source={require('../assets/imgs/deaths_pin.png')} style={{height: 20, width:20, marginTop : -20 }} />
              }             
            </Marker>);
           })} 
        </MapView>}
      </SafeAreaView>

    );
  }
}

const mapStateToProps = (state) => {
  return {
      infoByCountry : state.mapReducers,
      infoLocation : state.locationReducers
  }
}
const mapDispatchToProps = (dispatch) => {

  return {
      requestFetchConfirmedInfo: searchParam => dispatch(fetchConfirmedInfoByCountry(searchParam)),
      requestGetLocation: searchParam => dispatch(getCurrentLocation(searchParam)),

  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: 'center',
  },
  map: {
    marginTop : 10,
    width : width,
    height : height
  },
  marker: {
    marginLeft: 46,
    marginTop: 33,
    fontWeight: 'bold',
  },
  headerText : {
    color: "#00918A",
    fontSize : 22,
    fontWeight : '600',
    marginBottom : 10
  },
  headerView : {
    width : width,
    marginTop : 20,
    justifyContent : 'center',
    alignItems : 'center'
  },
  info_WHO : {
    flexDirection : 'row',
    width : '100%'
  },
  confirmedBtnView : {
    width : width/3,
    height : 30,
    flexDirection : 'row',
    // justifyContent : 'center',
    alignItems : 'center',
    marginLeft : 20

  },
  confirmedText : {
    marginLeft : 5,
    fontSize : 12
  },
  info_Self : {
    flexDirection : 'row',
    width : '100%'
  },
  symptomaticdBtnView : {
    width : width/4,
    height : 30,
    flexDirection : 'row',
    // justifyContent : 'center',
    alignItems : 'center',
    marginLeft : 20,
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
});
 export default connect(mapStateToProps, mapDispatchToProps)(Map);
