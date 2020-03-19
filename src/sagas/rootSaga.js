
import {call, fork, all} from 'redux-saga/effects';
import {root} from './homeSagas';

export default function* rootSaga() {
    yield call(root);
}