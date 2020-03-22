

import {
    ADD_REPORT_SUBMIT, 
    ADD_REPORT_SUBMIT_SUCCESSED, 
    ADD_REPORT_SUBMIT_FAILED, 
} from  '../action/actionType';

const reportReducers = (state = {loaded: false}, action) => {

    switch(action.type){
        case ADD_REPORT_SUBMIT_SUCCESSED:
            return {...state, receiveInfo : action.receiveInfo, submitted: true}; 
        case ADD_REPORT_SUBMIT_FAILED:
            return {...state, submitted: false}; 
        case ADD_REPORT_SUBMIT:
            return {...state, submitted: false};            
        default : 
            return state;        

    }
}
export default reportReducers;
