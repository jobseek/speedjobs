import { combineReducers } from 'redux';
import user from './user';
import comment from './comment';
import post from './post';
import recruit from './recruit';
import company from './company';

const rootReducer = combineReducers({ user, post, comment, recruit, company });

export default rootReducer;
