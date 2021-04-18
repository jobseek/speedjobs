import { combineReducers } from 'redux';
import user from './user';
import comment from './comment';
import post from './post';
import recruit from './recruit';
import profile from './profile';

const rootReducer = combineReducers({ user, post, comment, recruit, profile });

export default rootReducer;
