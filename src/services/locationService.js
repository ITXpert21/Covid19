import GetLocation from 'react-native-get-location';


export default class LocationService {
    static async getCurrentLocation(countryname) {
        let returnVal = {};
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          })
          .then(location => {
            return location;
          })
          .catch(error => {
              return error;
          })  
    
    }
}