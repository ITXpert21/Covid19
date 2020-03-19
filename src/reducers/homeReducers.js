

import {FETCH_INFOBYCOUNTURY, FETCH_INFOBYCOUNTURY_SUCCESSED, FETCH_INFOBYCOUNTURY_FAILED} from  '../action/actionType';

const homeReducers = (state = {loaded: false}, action) => {

    switch(action.type){
        case FETCH_INFOBYCOUNTURY_SUCCESSED:
            return {...state, receiveInfo : action.receiveInfo, loaded: true}; 
        case FETCH_INFOBYCOUNTURY_FAILED:
            return {...state, loaded: true}; 
        case FETCH_INFOBYCOUNTURY:
            return {...state, loaded: false};            
        default : 
            return state;        

    }
}
export default homeReducers;
