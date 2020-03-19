
import React, {Component} from 'react';
import { StyleSheet, View, SafeAreaView, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, ProviderPropType, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class Map extends Component{
  constructor(props) {
    super(props);
    this.state = {
      marker1: true,
      marker2: false,
      confirmedText : 'confirmed : 2400',
      recoveredText : 'recoverd : 50',

    };
  }
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Map</Text>  
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
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker
            title="New York"
            description={this.state.confirmedText + '\n' + this.state.recoveredText}
             onPress={() => this.setState({ marker1: !this.state.marker1 })}
            coordinate={{
              latitude: LATITUDE + SPACE,
              longitude: LONGITUDE + SPACE,
            }}
            centerOffset={{ x: -18, y: -60 }}
            anchor={{ x: 0.69, y: 1 }}
            //image={flagPinkImg}
          >
          <View>
          </View>  
          <Image source={require('../assets/imgs/confirm_pin.png')} style={{height: 30, width:30 }} />

          </Marker>
        </MapView>
      </SafeAreaView>

    );
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
  }
});

