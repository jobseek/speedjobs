import { combineReducers } from 'redux';
import user from './user';
import comment from './comment';
import post from './post';
import recruit from './recruit';
import profile from './profile';
import tag from './tag';
import company from './company';
import like from './like';
import resume from './resume';

const rootReducer = combineReducers({
  user,
  post,
  comment,
  recruit,
  profile,
  resume,
  tag,
  company,
  like,
});

export default rootReducer;
