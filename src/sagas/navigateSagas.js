

import {
    NAVIGATOR_PAGE
} from  '../action/actionType';

import * as NavigationService from '../services/NavigationService'
import {put, takeEvery} from 'redux-saga/effects';

function* navigatepage(param){
    console.log("navigate saga ====", param);
    NavigationService.navigate('Report');
}

export function* watchNavigate(){
    console.log("1212121212");
    yield takeEvery(NAVIGATOR_PAGE, navigatepage);

}