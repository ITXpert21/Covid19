
import {call, fork, all} from 'redux-saga/effects';
import {homeSagas} from './homeSagas';
import {reportSagas} from './reportSagas';
import {mapSagas} from './mapSagas';
import {locationSagas} from './locationSagas';

export default function* rootSaga() {
    yield all([
        homeSagas(),
        reportSagas(),
        mapSagas(),
        locationSagas()

    ]);
    //yield call(reportSagas);
}