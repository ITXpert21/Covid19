import {StyleSheet, Dimensions} from 'react-native';
  
const screenWidth = Math.round(Dimensions.get('window').width) ;
const screenHeight = Math.round(Dimensions.get('window').height) ;

export default tabStyle = StyleSheet.create({
    title : {
        fontSize : 16
    },
  
    selectedStyle : {
        color : '#00918A'
    }
  });
  