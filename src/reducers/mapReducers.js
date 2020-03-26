

import {FETCH_CONFIRMEDINFO, FETCH_CONFIRMEDINFO_SUCCESSED, FETCH_CONFIRMEDINFO_FAILED} from  '../action/actionType';

const mapReducers = (state = {loaded: false}, action) => {
    switch(action.type){
        case FETCH_CONFIRMEDINFO_SUCCESSED:
            return {...state, receiveInfo : action.receiveInfo, loaded: true}; 
        case FETCH_CONFIRMEDINFO_FAILED:
            return {...state, loaded: false}; 
        case FETCH_CONFIRMEDINFO:
            return {...state, loaded: false};            
        default : 
            return state;        

    }
}

export default mapReducers;
