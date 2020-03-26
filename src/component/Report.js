import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Dimensions, SafeAreaView, StyleSheet, Text, View,Image, TouchableOpacity } from "react-native";


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

import SegmentControl from 'react-native-segment-controller';
import Icon from 'react-native-vector-icons/Feather';
import GoogleLocationInput from './GoogleLocationInput';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Report extends Component {
  selectedParams = {
    positive : 'yes',
    haveSymptomatic : 'no',
    email : '',
    locationText : '',
    lat : '',
    lng : '',
    newReportId : '',
    country : ''
}  

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      content: '',
      indexSymptomatic: 1,
      yesSymptoms : false,
      noSymptoms : false,
      isModalVisible: false,
      locationText : 'Enter your location',
      lat : '',
      lng : '',
      locationValid : true
    };
    this.handlePress = this.handlePress.bind(this);
    this.handlePressSymptomatic = this.handlePressSymptomatic.bind(this);

  }

  toggleModal = () => {
    this.setState({isModalVisible: true});
  };

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
    if(this.state.locationText == "Enter your location"){
      this.setState({locationValid: false});

      return;
    }  
    this.selectedParams.locationText = this.state.locationText;
    this.selectedParams.lat = this.state.lat;
    this.selectedParams.lng = this.state.lng;
    this.selectedParams.newReportId = '';
    this.selectedParams.country = this.state.country;

    let navParam = this.selectedParams;
    this.props.navigation.navigate(
      'Submit',
      { navParam },
    );
   // NavigationService.navigate('Submit', {this.selectedParams});
  }

  hideInputView = () => {
    this.setState({isModalVisible: false});
  }

  handleLocation = (data, locationInfo) => {

    let dataLength = data.terms.length;
    this.setState({isModalVisible: false});
    this.setState({country: data.terms[dataLength-1].value});
    this.setState({locationText: data.description});
    this.setState({lat: locationInfo.lat});
    this.setState({lng: locationInfo.lng});
    this.setState({locationValid: true});


  } 

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {!this.state.isModalVisible &&
        <View>
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


        <TouchableOpacity onPress={this.toggleModal}>
          <View style={this.state.locationValid ? styles.locationView : styles.locationInvalidView} >
            <Text style={{color : '#5e5e5e', fontSize : 16, marginLeft : 10}}>{this.state.locationText}</Text>
          </View>
        </TouchableOpacity>

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


      <TouchableOpacity onPress={() => this.Next()}>
        <View style={styles.nextBtn}>
          <Text style={styles.nextText}>Next</Text>
        </View>
      </TouchableOpacity>
    
      </View>}
      
      {/* {this.state.isModalVisible && 
        <View style={styles.googleInputView} >
          <View style={styles.googleInputIconlView}>
            <Icon name="search"  size={20} color="#00918A" style={styles.icon}/>
          </View>
          <View style={styles.googleInputDetailView}>
            <GoogleLocationInput />
          </View>  
          <View style={styles.googleCancellView}>
              <Text style={styles.cancelText}> close </Text>
          </View>
        </View>
        }          */}
       {this.state.isModalVisible && 
        <View style={styles.googleInputView} >
            <GoogleLocationInput hideGoogleInput={this.hideInputView} selecteLocationInfo={this.handleLocation}/>
        </View>
        }   
       
      </SafeAreaView>
    
    );
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
    height : 50,
    width : screenWidth-40,
    marginLeft : 20,
    marginBottom : 20,
    // borderColor : '#5e5e5e',
    borderRadius : 5,
    justifyContent : 'center',
    backgroundColor : 'white'

  },
  locationInvalidView : {
    height : 50,
    width : screenWidth-40,
    marginLeft : 20,
    marginBottom : 20,
    borderColor : 'red',
    borderWidth : 1,
    borderRadius : 5,
    justifyContent : 'center',
    backgroundColor : 'white'

  },  
  googleInputView : {
    flexDirection : 'row',
    height : screenHeight,
    width : '95%',
    margin : 10,

  },  
  googleInputIconlView : {
    height : 49,
    marginTop : 10,
    width : '10%',
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : 'white'
  },  
  googleInputDetailView : {
    height : 50,
    width : '70%',
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : 'white'

  },
  googleCancellView : {
    height : 42,
    marginTop : 10,
    width : '15%',
    justifyContent : 'flex-end',
    alignItems : 'flex-start',
  },
  cancelText : {
    color : '#00918A',
    fontSize : 16,
    fontWeight : '500' ,
    marginTop : 20   
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
  },
});
