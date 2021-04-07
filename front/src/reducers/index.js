import { combineReducers } from 'redux';
import user from './user';
import comment from './comment';
import post from './post';

const rootReducer = combineReducers({ user, post, comment });

export default rootReducer;
