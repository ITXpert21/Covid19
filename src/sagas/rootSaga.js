
import {call, fork, all} from 'redux-saga/effects';
import {homeSagas} from './homeSagas';
import {reportSagas} from './reportSagas';

export default function* rootSaga() {
    yield all([
        homeSagas(),
        reportSagas()
    ]);
    //yield call(reportSagas);
}