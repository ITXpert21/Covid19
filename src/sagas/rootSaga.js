
import {call, fork, all} from 'redux-saga/effects';
import {watchFetchInfoByCountry} from './homeSagas';

export default function* rootSaga() {
    yield call(watchFetchInfoByCountry);

}