

import {    
    GET_CURRENT_LOCATION,
    GET_CURRENT_LOCATION_SUCCESSED,
    GET_CURRENT_LOCATION_FAILED,} from  '../action/actionType';

const locationReducers = (state = {loaded: false}, action) => {
    switch(action.type){
        case GET_CURRENT_LOCATION_SUCCESSED:
            console.log('1111111 ', action.receiveInfo);

            return {...state, receiveInfo : action.receiveInfo, loaded: true}; 
        case GET_CURRENT_LOCATION_FAILED:
            return {...state, loaded: false}; 
        case GET_CURRENT_LOCATION:
            return {...state, loaded: false};            
        default : 
            return state;        

    }
}
export default locationReducers;
