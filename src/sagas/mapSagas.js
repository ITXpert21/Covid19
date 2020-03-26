

import {
    FETCH_CONFIRMEDINFO,
    FETCH_CONFIRMEDINFO_SUCCESSED,
    FETCH_CONFIRMEDINFO_FAILED
    
} from  '../action/actionType';

import {put, takeEvery} from 'redux-saga/effects';
import mapService from '../services/mapService';
import {call} from 'redux-saga/effects';

function* fetchConfirmedInfoByCountry(param){
    try{
        let countryname =  param.param.countryname;
        const receiveInfo =  yield call(mapService.getInfoByCountry, countryname);
       yield put({ type : FETCH_CONFIRMEDINFO_SUCCESSED, receiveInfo : receiveInfo});
    }catch(error){
        console.log("api call error", error);
        yield put({ type : FETCH_CONFIRMEDINFO_FAILED, error});
    }
}

export function* mapSagas(){
    yield takeEvery(FETCH_CONFIRMEDINFO, fetchConfirmedInfoByCountry);


}