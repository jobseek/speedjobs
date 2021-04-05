import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import postSage from './post';

axios.defaults.baseURL = 'http://localhost:8081/api';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSage)]);
}
