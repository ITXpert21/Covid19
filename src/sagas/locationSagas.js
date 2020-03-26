

import {
    GET_CURRENT_LOCATION,
    GET_CURRENT_LOCATION_SUCCESSED,
    GET_CURRENT_LOCATION_FAILED,
    
} from  '../action/actionType';

import {put, takeEvery} from 'redux-saga/effects';
import locationService from '../services/locationService';
import {call} from 'redux-saga/effects';

function* getCurrentLocation(param){
  try{
    let countryname =  param.param.countryname;
    const receiveInfo =  yield call(locationService.getCurrentLocation, countryname);
    if(receiveInfo == undefined){
        return;
    }
    
    yield put({ type : GET_CURRENT_LOCATION_SUCCESSED, receiveInfo : receiveInfo});
  }catch(error){
      console.log("api call error", error);
      yield put({ type : GET_CURRENT_LOCATION_FAILED, error});
  }
}

export function* locationSagas(){

    yield takeEvery(GET_CURRENT_LOCATION, getCurrentLocation);


}