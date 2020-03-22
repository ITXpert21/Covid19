

import {
    FETCH_INFOBYCOUNTURY, 
    FETCH_INFOBYCOUNTURY_SUCCESSED, 
    FETCH_INFOBYCOUNTURY_FAILED, 

    ADD_REPORT_SUBMIT
} from  '../action/actionType';

import {put, takeEvery} from 'redux-saga/effects';
import homeService from '../services/homeService';
import {call} from 'redux-saga/effects';

function* fetchInfoByCountry(param){
    try{
        let countryname =  param.param.countryname;
        const receiveInfo =  yield call(homeService.getInfoByCountry, countryname);
        yield put({ type : FETCH_INFOBYCOUNTURY_SUCCESSED, receiveInfo : receiveInfo});
    }catch(error){
        console.log("api call error", error);
        yield put({ type : FETCH_INFOBYCOUNTURY_FAILED, error});
    }
}

export function* homeSagas(){
    yield takeEvery(FETCH_INFOBYCOUNTURY, fetchInfoByCountry);


}