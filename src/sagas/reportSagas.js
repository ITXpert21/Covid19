

import {
    ADD_REPORT_SUBMIT, 
    ADD_REPORT_SUBMIT_SUCCESSED, 
    ADD_REPORT_SUBMIT_FAILED, 
} from  '../action/actionType';

import {put, takeEvery} from 'redux-saga/effects';
import reportService from '../services/reportService';
import {call} from 'redux-saga/effects';

function* addReportSubmit(param){
    try{
        const receiveInfo =  yield call(reportService.submitReport, param.param.addParam);
        yield put({ type : ADD_REPORT_SUBMIT_SUCCESSED, receiveInfo : receiveInfo});
    }catch(error){
         console.log("api call error", error);
         yield put({ type : ADD_REPORT_SUBMIT_FAILED, error});
    }
}
export function* reportSagas(){
     yield takeEvery(ADD_REPORT_SUBMIT, addReportSubmit);


}