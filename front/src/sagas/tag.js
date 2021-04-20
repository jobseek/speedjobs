import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  TAG_GET_FAIL,
  TAG_GET_REQUEST,
  TAG_GET_SUCCESS,
} from '../reducers/tag';

function getTagApi() {
  return axios.get('/tag');
}

function* getTag(action) {
  try {
    const result = yield call(getTagApi, action.data);
    yield put({
      type: TAG_GET_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: TAG_GET_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}

function* watchTagGet() {
  yield takeLatest(TAG_GET_REQUEST, getTag);
}

export default function* tagSaga() {
  yield all([fork(watchTagGet)]);
}
