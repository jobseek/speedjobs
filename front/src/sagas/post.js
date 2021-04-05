import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { POST_GET_REQUEST } from '../reducers/post';

function* signUp(action) {
  console.log(action);
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: '포스팅중 예외발생. 서버를 확인하세요' ?? error.response.data,
    });
  }
}

function getPostAip() {
  return axios.get('.');
}

function* getPost(action) {
  try {
    yield call();
  }
}

function* watchPostGet() {
  yield takeLatest(POST_GET_REQUEST, getPost);
}
export default function* postSaga() {
  yield all([fork(watchPostGet)]);
}
