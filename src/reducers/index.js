
import {combineReducers} from 'redux';
import homeReducers from './homeReducers';

const allReducers = combineReducers({
    homeReducers,
});
export default allReducers;