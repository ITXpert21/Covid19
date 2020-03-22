
import {combineReducers} from 'redux';
import homeReducers from './homeReducers';
import reportReducers from './reportReducers';

const allReducers = combineReducers({
    homeReducers,
    reportReducers
});
export default allReducers;