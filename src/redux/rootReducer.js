import {combineReducers} from 'redux-immutable';
import baseReducer from './baseReducer';

const reducer = combineReducers({
    base: baseReducer,
});

export default reducer;
