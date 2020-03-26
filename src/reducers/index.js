
import {combineReducers} from 'redux';
import homeReducers from './homeReducers';
import reportReducers from './reportReducers';
import mapReducers from './mapReducers';
import locationReducers from './locationReducers';

const allReducers = combineReducers({
    homeReducers,
    reportReducers,
    mapReducers,
    locationReducers
});
export default allReducers;