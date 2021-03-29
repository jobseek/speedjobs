import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:8081/api';

export default function* rootSaga() {
  yield all([fork(userSaga)]);
}
