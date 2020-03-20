import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Dimensions, SafeAreaView, StyleSheet, Text, View,Image, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { screenWidth, screenHeight } = Dimensions.get('window');
import SegmentControl from 'react-native-segment-controller';
import * as NavigationService from '../services/NavigationService'
import Icon from 'react-native-vector-icons/Feather';

class Report extends Component {
  selectedParams = {
    positive : '',
    haveSymptomatic : ''
  }  

  constructor(props) {
    super(props);
    this.state = {
      index: -1,
      content: '',
      indexSymptomatic: -1,
      yesSymptoms : false,
      noSymptoms : false,

    };
    this.handlePress = this.handlePress.bind(this);
    this.handlePressSymptomatic = this.handlePressSymptomatic.bind(this);

  }

  handlePress(index) {
    switch(index){
      case 0:
        this.selectedParams.positive = 'yes';
        break;
      case 1:
        this.selectedParams.positive = 'no';
        break;
      case 2:
        this.selectedParams.positive = 'positive';
        break;
      case 3:
        this.selectedParams.positive = 'nottested';
        break;
    }
    this.setState({index});

  }

  handlePressSymptomatic(indexSymptomatic) {
    switch(indexSymptomatic){
      case 0:
        this.selectedParams.haveSymptomatic = 'yes';
        break;
      case 1:
        this.selectedParams.haveSymptomatic = 'no';
        break;
  
      }
    this.setState({indexSymptomatic});
  }

  Next = () => {
    let navParam = this.selectedParams;
    this.props.navigation.navigate(
      'Submit',
      { navParam },
    );
   // NavigationService.navigate('Submit', {this.selectedParams});
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
        <View style={styles.locationView}>
          <GooglePlacesAutocomplete
            placeholder='Enter your location'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
  
            getDefaultValue={() => ''}
      
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyB8nm4Avunu0rENuo2tpWgV8jKUKLFbESw',
              language: 'en', // language of the results
              types: '(cities)' // default: 'geocode'
            }}
      
            styles={{
              textInputContainer: {
                width: '100%',
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                borderBottomWidth: 0,
              },
              textInput : {
                height : 40,
                marginLeft : 20,
                marginRight : 20,
                marginTop : 20

              },
              description: {
                fontWeight: 'bold'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              }
            }}
  
  
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        //renderLeftButton={()  => <Image source={require('../assets/imgs/positive_btn.png')} />}
        // renderRightButton={() => <Text>Custom text after the input</Text>}
        />  
      </View>
      <View style={styles.segmentView}>
        <Text style={styles.positiveText}>Have you tested positive for the Corona Virus?</Text>
        <SegmentControl
          values={['Yes', 'No', 'Positive', 'Not Tested']}
          selectedIndex={this.state.index}
          height={40}
          onTabPress={this.handlePress}
          tabStyle={styles.segmentBtn}  
          tabTextStyl e={{color : '#363636'}}
          activeTabStyle={{backgroundColor : '#00918A'}}
        />
      </View>
      <View style={styles.segmentSymtomaticRootView}>
        <Text style={styles.positiveText}>Are you having symptomps?</Text>
        <View style={styles.segmentSymtomaticView}>
          <SegmentControl
            values={['Yes', 'No']}
            selectedIndex={this.state.indexSymptomatic}
            height={40}
            onTabPress={this.handlePressSymptomatic}
            tabStyle={styles.segmentBtn}  
            tabTextStyl e={{color : '#363636'}}
            activeTabStyle={{backgroundColor : '#00918A'}}
          />
        </View> 
      </View>  

      {/* <View style={styles.segmentSymtomaticRootView}>
        <Text style={styles.positiveText}>Are you having symptomps?</Text>
        <View style={styles.segmentSymtomaticView}>
          <SegmentControl
            values={['Yes', 'No']}
            selectedIndex={this.state.indexSymptomatic}
            height={40}
            onTabPress={this.handlePressSymptomatic}
            tabStyle={styles.segmentBtn}  
            tabTextStyl e={{color : '#363636'}}
            activeTabStyle={{backgroundColor : '#00918A'}}
          />
        </View> 
      </View>  
      <View style={styles.segmentSymtomaticRootView}>
        <Text style={styles.positiveText}>Are you having symptomps?</Text>
        <View style={styles.segmentSymtomaticView}>
          <SegmentControl
            values={['Yes', 'No']}
            selectedIndex={this.state.indexSymptomatic}
            height={40}
            onTabPress={this.handlePressSymptomatic}
            tabStyle={styles.segmentBtn}  
            tabTextStyl e={{color : '#363636'}}
            activeTabStyle={{backgroundColor : '#00918A'}}
          />
        </View> 
      </View>  
      <View style={styles.segmentSymtomaticRootView}>
        <Text style={styles.positiveText}>Are you having symptomps?</Text>
        <View style={styles.segmentSymtomaticView}>
          <SegmentControl
            values={['Yes', 'No']}
            selectedIndex={this.state.indexSymptomatic}
            height={40}
            onTabPress={this.handlePressSymptomatic}
            tabStyle={styles.segmentBtn}  
            tabTextStyl e={{color : '#363636'}}
            activeTabStyle={{backgroundColor : '#00918A'}}
          />
        </View> 
      </View>   */}
      <TouchableOpacity onPress={() => this.Next()}>
        <View style={styles.nextBtn}>
          <Text style={styles.nextText}>Next</Text>
        </View>
      </TouchableOpacity>
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
  locationView : {
    height : 80,
    width : '100%'
  },
  segmentView : {
    height : 80,
    justifyContent : 'center',
    alignItems : 'center',
    marginLeft : 20,
    marginRight : 20
  } ,
  segmentBtn : {
    marginRight : 5,
    backgroundColor : 'white',
    borderColor : 'white'    ,
    borderRadius : 10
  },
  positiveText : {
    color : '#363636',
    fontSize : 14,
    fontWeight :'600',
    marginBottom : 10
  },
  segmentSymtomaticRootView : {
    marginLeft : 20,
    marginRight : 20,
    height : 100,
    justifyContent : 'center'
  },
  segmentSymtomaticView : {
    width : '50%',
  },
  segmentSymptomaticBtn : {
    height : 100,
    marginRight : 5,
    backgroundColor : 'white',
    borderColor : 'white'    ,
    borderRadius : 10
  }, 
  nextBtn : {
    height : 50,
    margin : 30,
    backgroundColor : '#00918A',
    borderRadius : 10,
    justifyContent : 'center',
    alignItems : 'center'
  },
  nextText : {
    color : 'white',
    fontSize : 18,
    fontWeight : '600'
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Report);