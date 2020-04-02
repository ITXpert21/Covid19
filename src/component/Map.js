
import React, {Component} from 'react';
import { StyleSheet, View, SafeAreaView, Text, Dimensions, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import MapView, { Marker,  PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import * as RNLocalize from "react-native-localize";
import {countries} from 'country-data';
import {connect} from 'react-redux';
import {fetchConfirmedInfoByCountry, getCurrentLocation} from '../action'
import { ToggleButton } from 'react-native-paper';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

 class Map extends Component{
  selectedCountry = countries[RNLocalize.getCountry()].name;

  constructor(props) {
    super(props);
    this.state = {
      seletedConfirmed: false,
      seletedDeaths: false,

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
      
    })
    .catch(error => {
        const { code, message } = error;
        console.log('error');
        console.warn(code, message);
    })  
  }

  componentDidMount(){
    this.props.requestFetchConfirmedInfo({countryname : this.state.currentCountry});

  }

  renderAllMarker(info){
    if(info.confirmed >  20000 && info.confirmed > 0){
      if(info.deaths >  2000 && info.deaths > 0)
        return <View style={styles.confirmMarkerMediumView}><View style={styles.deathsMarkerMediumView1}></View></View>;
      if(info.deaths >  5000 && info.deaths > 0)
        return <View style={styles.confirmMarkerMediumView}><View style={styles.deathsMarkerLargeView1}></View></View>;      
      if(info.deaths >  1000 && info.deaths > 0)
        return <View style={styles.confirmMarkerMediumView}><View style={styles.deathsMarkerSmallView1}></View></View>;      
      if(info.deaths <= 1000 && info.deaths > 0)
        return <View style={styles.confirmMarkerMediumView}><View style={styles.deathsMarkerView1}></View></View>;  
    }
    if(info.confirmed >  50000 && info.confirmed > 0){
      if(info.deaths >  2000 && info.deaths > 0)
        return <View style={styles.confirmMarkerLargeView}><View style={styles.deathsMarkerMediumView1}></View></View>;
      if(info.deaths >  5000 && info.deaths > 0)
        return <View style={styles.confirmMarkerLargeView}><View style={styles.deathsMarkerLargeView1}></View></View>;      
      if(info.deaths >  1000 && info.deaths > 0)
        return <View style={styles.confirmMarkerLargeView}><View style={styles.deathsMarkerSmallView1}></View></View>;      
      if(info.deaths <= 1000 && info.deaths > 0)
        return <View style={styles.confirmMarkerLargeView}><View style={styles.deathsMarkerView1}></View></View>;  
    }    
    if(info.confirmed >  10000 && info.confirmed > 0){
      if(info.deaths >  2000 && info.deaths > 0)
        return <View style={styles.confirmMarkerSmallView}><View style={styles.deathsMarkerMediumView1}></View></View>;
      if(info.deaths >  5000 && info.deaths > 0)
        return <View style={styles.confirmMarkerSmallView}><View style={styles.deathsMarkerLargeView1}></View></View>;      
      if(info.deaths >  1000 && info.deaths > 0)
        return <View style={styles.confirmMarkerSmallView}><View style={styles.deathsMarkerSmallView1}></View></View>;      
      if(info.deaths <= 1000 && info.deaths > 0)
        return <View style={styles.confirmMarkerSmallView}><View style={styles.deathsMarkerView1}></View></View>;  
    }
    if(info.confirmed <= 10000 && info.confirmed > 0){
      if(info.deaths >  2000 && info.deaths > 0)
        return <View style={styles.confirmMarkerView}><View style={styles.deathsMarkerMediumView1}></View></View>;
      if(info.deaths >  5000 && info.deaths > 0)
        return <View style={styles.confirmMarkerView}><View style={styles.deathsMarkerLargeView1}></View></View>;      
      if(info.deaths >  1000 && info.deaths > 0)
        return <View style={styles.confirmMarkerView}><View style={styles.deathsMarkerSmallView1}></View></View>;      
      if(info.deaths <= 1000 && info.deaths > 0)
        return <View style={styles.confirmMarkerView}><View style={styles.deathsMarkerView1}></View></View>;  
    } 
  }

  renderConfirmMarker(info){
    if(this.state.seletedDeaths && info.deaths > 0){
      if(info.confirmed >  20000){
        if(info.deaths >  2000)
          return <View style={styles.confirmMarkerMediumView}><View style={styles.deathsMarkerMediumView1}></View></View>;
        if(info.deaths >  5000)
          return <View style={styles.confirmMarkerMediumView}><View style={styles.deathsMarkerLargeView1}></View></View>;      
        if(info.deaths >  1000)
          return <View style={styles.confirmMarkerMediumView}><View style={styles.deathsMarkerSmallView1}></View></View>;      
        else
          return <View style={styles.confirmMarkerMediumView}><View style={styles.deathsMarkerView1}></View></View>;  
      }
      if(info.confirmed >  50000){
        if(info.deaths >  2000)
          return <View style={styles.confirmMarkerLargeView}><View style={styles.deathsMarkerMediumView1}></View></View>;
        if(info.deaths >  5000)
          return <View style={styles.confirmMarkerLargeView}><View style={styles.deathsMarkerLargeView1}></View></View>;      
        if(info.deaths >  1000)
          return <View style={styles.confirmMarkerLargeView}><View style={styles.deathsMarkerSmallView1}></View></View>;      
        else
          return <View style={styles.confirmMarkerLargeView}><View style={styles.deathsMarkerView1}></View></View>;  
      }    
      if(info.confirmed >  10000){
        if(info.deaths >  2000)
          return <View style={styles.confirmMarkerSmallView}><View style={styles.deathsMarkerMediumView1}></View></View>;
        if(info.deaths >  5000)
          return <View style={styles.confirmMarkerSmallView}><View style={styles.deathsMarkerLargeView1}></View></View>;      
        if(info.deaths >  1000)
          return <View style={styles.confirmMarkerSmallView}><View style={styles.deathsMarkerSmallView1}></View></View>;      
        else
          return <View style={styles.confirmMarkerSmallView}><View style={styles.deathsMarkerView1}></View></View>;  
      }else{
        if(info.deaths >  2000)
          return <View style={styles.confirmMarkerView}><View style={styles.deathsMarkerMediumView1}></View></View>;
        if(info.deaths >  5000)
          return <View style={styles.confirmMarkerView}><View style={styles.deathsMarkerLargeView1}></View></View>;      
        if(info.deaths >  1000)
          return <View style={styles.confirmMarkerView}><View style={styles.deathsMarkerSmallView1}></View></View>;      
        else
          return <View style={styles.confirmMarkerView}><View style={styles.deathsMarkerView1}></View></View>;  
      } 

    }else{
      if(info.confirmed >  20000)
        return <View style={styles.confirmMarkerMediumView}></View>;
      if(info.confirmed >  50000)
        return <View style={styles.confirmMarkerLargeView}></View>;      
      if(info.confirmed >  10000)
        return <View style={styles.confirmMarkerSmallView}></View>;      
      else
        return <View style={styles.confirmMarkerView}></View>; 
    }       
  }

  renderDeathsMarker(info){
    if(this.state.seletedConfirmed && info.confirmed > 0){
      if(info.confirmed >  20000){
        if(info.deaths >  2000)
          return <View style={styles.confirmMarkerMediumView}><View style={styles.deathsMarkerMediumView1}></View></View>;
        if(info.deaths >  5000)
          return <View style={styles.confirmMarkerMediumView}><View style={styles.deathsMarkerLargeView1}></View></View>;      
        if(info.deaths >  1000)
          return <View style={styles.confirmMarkerMediumView}><View style={styles.deathsMarkerSmallView1}></View></View>;      
        else
          return <View style={styles.confirmMarkerMediumView}><View style={styles.deathsMarkerView1}></View></View>;  
      }
      if(info.confirmed >  50000){
        if(info.deaths >  2000)
          return <View style={styles.confirmMarkerLargeView}><View style={styles.deathsMarkerMediumView1}></View></View>;
        if(info.deaths >  5000)
          return <View style={styles.confirmMarkerLargeView}><View style={styles.deathsMarkerLargeView1}></View></View>;      
        if(info.deaths >  1000)
          return <View style={styles.confirmMarkerLargeView}><View style={styles.deathsMarkerSmallView1}></View></View>;      
        else
          return <View style={styles.confirmMarkerLargeView}><View style={styles.deathsMarkerView1}></View></View>;  
      }    
      if(info.confirmed >  10000){
        if(info.deaths >  2000)
          return <View style={styles.confirmMarkerSmallView}><View style={styles.deathsMarkerMediumView1}></View></View>;
        if(info.deaths >  5000)
          return <View style={styles.confirmMarkerSmallView}><View style={styles.deathsMarkerLargeView1}></View></View>;      
        if(info.deaths >  1000)
          return <View style={styles.confirmMarkerSmallView}><View style={styles.deathsMarkerSmallView1}></View></View>;      
        else
          return <View style={styles.confirmMarkerSmallView}><View style={styles.deathsMarkerView1}></View></View>;  
      }else{
        if(info.deaths >  2000)
          return <View style={styles.confirmMarkerView}><View style={styles.deathsMarkerMediumView1}></View></View>;
        if(info.deaths >  5000)
          return <View style={styles.confirmMarkerView}><View style={styles.deathsMarkerLargeView1}></View></View>;      
        if(info.deaths >  1000)
          return <View style={styles.confirmMarkerView}><View style={styles.deathsMarkerSmallView1}></View></View>;      
        else
          return <View style={styles.confirmMarkerView}><View style={styles.deathsMarkerView1}></View></View>;  
      } 

    }else{
      if(info.deaths >  2000)
        return <View style={styles.deathsMarkerMediumView1}></View>;
      if(info.deaths >  5000)
        return <View style={styles.deathsMarkerLargeView1}></View>;      
      if(info.deaths >  1000)
        return <View style={styles.deathsMarkerSmallView1}></View>;      
      else
        return <View style={styles.deathsMarkerView1}></View>; 
    }     
  }


  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Map</Text>  
          <View style={styles.info_WHO}>
            <TouchableOpacity onPress={() => this.setState({ seletedConfirmed: !this.state.seletedConfirmed })}>
              <View style={this.state.seletedConfirmed ? styles.selected_confirmedBtnView : styles.confirmedBtnView}>
                <View style={styles.icon_WHO}></View>
                <Text style={styles.confirmedText}>WHO Confirmed</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({ seletedDeaths: !this.state.seletedDeaths })}>
              <View style={styles.confirmedBtnView} style={this.state.seletedDeaths ? styles.selected_confirmedBtnView : styles.confirmedBtnView}>
                <View style={styles.icon_Deaths}></View>
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
          initialRegion={{
            latitude: this.state.currentLat,
            longitude: this.state.currentLng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}

        >
          {this.props.infoByCountry.loaded && this.props.infoByCountry.receiveInfo.locations.map(marker => {
            return(
              <Marker
                title={marker.province + " " + marker.country}
                description={"confirmed: " + marker.latest.confirmed + '\n' + "deaths: " + marker.latest.deaths+ '\n' + "recovered: " + marker.latest.recovered}
                coordinate={marker.coordinates}
                centerOffset={{ x: -18, y: -60 }}
                anchor={{ x: 0.5, y: 0.5 }}
              >
              {!this.state.seletedConfirmed && !this.state.seletedDeaths &&
                <View>
                  {marker.latest.confirmed > 0 &&
                    this.renderAllMarker(marker.latest)
                  }  
                </View>
              }
              {this.state.seletedConfirmed && 
                <View>
                  {marker.latest.confirmed > 0 &&
                    this.renderConfirmMarker(marker.latest)
                  }  
                </View>
              }  
              {this.state.seletedDeaths && 
                <View>
                  {marker.latest.deaths > 0 &&
                    this.renderDeathsMarker(marker.latest)
                  }  
                </View>
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
    requestFetchFromFirebase: () => dispatch(fetchInfoFromFirebase()),
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
  selected_confirmedBtnView : {
    padding : 5,
    width : width/3,
    height : 30,
    flexDirection : 'row',
    backgroundColor : '#FF7C7C',   
    alignItems : 'center',
    marginLeft : 20,
    borderRadius : 10

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
  confirmMarkerView : {
    width : 20,
    height : 20,
    borderRadius : 50,
    borderWidth : 1,
    borderColor : 'red',
    backgroundColor : '#FF7C7C'
  },
  confirmMarkerSmallView : {
    width : 40,
    height : 40,
    borderRadius : 50,
    borderWidth : 1,
    borderColor : 'red',
    backgroundColor : '#FF7C7C'
  },
  confirmMarkerMediumView : {
    width : 60,
    height : 60,
    borderRadius : 50,
    borderWidth : 1,
    borderColor : 'red',
    backgroundColor : '#FF7C7C'
  },  
  confirmMarkerLargeView : {
    width : 80,
    height : 80,
    borderRadius : 50,
    borderWidth : 1,
    borderColor : 'red',
    backgroundColor : '#FF7C7C'
  }, 
  icon_WHO : {
    width : 15,
    height : 15,
    borderRadius : 3,
    borderWidth : 1,
    borderColor : 'red',
    backgroundColor : '#FF7C7C'    
  },
  deathsMarkerView : {
    width : 15,
    height : 15,
    borderRadius : 50,
    borderWidth : 1,
    borderColor : 'black',
    backgroundColor : '#212121',
     marginTop : -15    
  },
  deathsMarkerSmallView : {
    width : 30,
    height : 30,
    borderRadius : 50,
    borderWidth : 1,
    borderColor : 'black',
    backgroundColor : '#212121',
    marginTop : -25    
  },
  deathsMarkerMediumView : {
    width : 50,
    height :50,
    borderRadius : 50,
    borderWidth : 1,
    borderColor : 'black',
    backgroundColor : '#212121',
    marginTop : -45    
  },
  deathsMarkerLargeView : {
    width : 70,
    height :70,
    borderRadius : 50,
    borderWidth : 1,
    borderColor : 'black',
    backgroundColor : '#212121',
    marginTop : -65    
  }, 
  
  deathsMarkerView1 : {
    width : 15,
    height : 15,
    borderRadius : 50,
    borderWidth : 1,
    borderColor : 'black',
    backgroundColor : '#212121',
  },
  deathsMarkerSmallView1 : {
    width : 30,
    height : 30,
    borderRadius : 50,
    borderWidth : 1,
    borderColor : 'black',
    backgroundColor : '#212121',
  },
  deathsMarkerMediumView1 : {
    width : 50,
    height :50,
    borderRadius : 50,
    borderWidth : 1,
    borderColor : 'black',
    backgroundColor : '#212121',
  },
  deathsMarkerLargeView1 : {
    width : 70,
    height :70,
    borderRadius : 50,
    borderWidth : 1,
    borderColor : 'black',
    backgroundColor : '#212121',
  }, 

  icon_Deaths : {
    width : 15,
    height : 15,
    borderRadius : 3,
    borderWidth : 1,
    borderColor : 'black',
    backgroundColor : '#212121'    
  },
});
 export default connect(mapStateToProps, mapDispatchToProps)(Map);
