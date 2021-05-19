import { combineReducers } from 'redux';

import calcReducer from './calcReducer';
import currentCalcReducer from './currentCalcReducer';

export default combineReducers({
    calc: calcReducer,
    current: currentCalcReducer
});