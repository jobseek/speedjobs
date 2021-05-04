import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import commentSaga from './comment';
import postSage from './post';
import recruitSaga from './recruit';
import address from '../auth/address';
import profileSaga from './profile';
import resumeSaga from './resume';
import tagSaga from './tag';
import companySaga from './company';
import likeSaga from './like';
import adminSaga from './admin';

axios.defaults.baseURL = `http://${address()}:8081/api`;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSage),
    fork(profileSaga),
    fork(commentSaga),
    fork(recruitSaga),
    fork(tagSaga),
    fork(companySaga),
    fork(likeSaga),
    fork(resumeSaga),
    fork(adminSaga),
  ]);
}
