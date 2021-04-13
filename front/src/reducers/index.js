import { combineReducers } from 'redux';
import user from './user';
import comment from './comment';
import post from './post';
import recruit from './recruit';

const rootReducer = combineReducers({ user, post, comment, recruit });

export default rootReducer;
