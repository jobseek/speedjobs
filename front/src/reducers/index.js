import { combineReducers } from 'redux';
import user from './user';
import comment from './comment';
import post from './post';
import recruitment from './recruitment';

const rootReducer = combineReducers({ user, post, comment, recruitment });

export default rootReducer;
