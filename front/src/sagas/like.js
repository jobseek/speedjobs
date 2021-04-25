import { all, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_LIKE_FAIL,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  GET_LIKE_FAIL,
  GET_LIKE_REQUEST,
  GET_LIKE_SUCCESS,
  UN_LIKE_FAIL,
  UN_LIKE_REQUEST,
  UN_LIKE_SUCCESS,
} from '../reducers/like';

function addLikeApi(action) {
  return axios.post(`/post/${action.data.id}/favorite`, { data: action.data });
}

function* addLike(action) {
  try {
    yield addLikeApi(action);
    yield put({
      type: ADD_LIKE_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: ADD_LIKE_FAIL,
      error: e ?? 'error',
    });
  }
}

function unLikeApi(action) {
  const { size, page } = action.data;
  return axios.delete(
    `/post/${action.data.id}/favorite/?size=${size}&page=${page}&sort=id,DESC`
  );
}

function* unLike(action) {
  try {
    yield unLikeApi(action);
    yield put({
      type: UN_LIKE_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: UN_LIKE_FAIL,
      error: e ?? 'error',
    });
  }
}
function getLikeApi(action) {
  return axios.get(`/post/favorites`);
}

function* getLike(action) {
  try {
    const ret = yield getLikeApi(action);
    yield put({
      type: GET_LIKE_SUCCESS,
      data: ret.data,
    });
  } catch (e) {
    yield put({
      type: GET_LIKE_FAIL,
      error: e ?? 'error',
    });
  }
}
function* watchAddLike() {
  yield takeLatest(ADD_LIKE_REQUEST, addLike);
}

function* watchUnLike() {
  yield takeLatest(UN_LIKE_REQUEST, unLike);
}

function* watchGetLike() {
  yield takeLatest(GET_LIKE_REQUEST, getLike);
}
export default function* likeSaga() {
  yield all([fork(watchAddLike), fork(watchUnLike), fork(watchGetLike)]);
}
