import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {authenticate} from './authenticate.js';

const rootReducer = combineReducers({
    routing: routerReducer,
    authenticate,
});

export default rootReducer;
