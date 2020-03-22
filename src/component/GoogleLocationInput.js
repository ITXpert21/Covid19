import React, {Component} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {  StyleSheet, Text, View, Image} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';

export default class GoogleLocationInput extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }
  cancel = () => {
    this.props.hideGoogleInput();            
  } 

  handleLocation = (data, details) => {
    this.props.selecteLocationInfo( data.description, details.geometry.location);
  } 
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search Location'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => this.handleLocation(data, details)}

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
            height : 50,

          },
          textInput : {
            height : 50,
          },
          listView : {
            //marginLeft : 20,
          },          
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={()  => <Icon name="search"  size={20} color="#00918A" style={styles.searchIcon}/> }
      renderRightButton={() => 
        <TouchableOpacity onPress={this.cancel}>
            <Text style={styles.cancelText}> close </Text>

        </TouchableOpacity>
      }
    />  
    );
  }
}
const styles = StyleSheet.create({
  cancelText : {
    marginTop : 20,
    color : '#00918A',
    fontSize : 18,
    fontWeight : '500'    
  },
  searchIcon : {
    marginTop : 10,
    height : 50,
    borderWidth : 1,
    backgroundColor : 'white'
  }

});

