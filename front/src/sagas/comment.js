import axios from 'axios';
import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import {
  COMMENT_ADD_FAIL,
  COMMENT_ADD_REQUEST,
  COMMENT_ADD_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_GET_FAIL,
  COMMENT_GET_REQUEST,
  COMMENT_GET_SUCCESS,
} from '../reducers/comment';

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: COMMENT_ADD_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: COMMENT_ADD_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}

function addCommentAPI(data) {
  const res = axios
    .post('/post', data)
    .then((response) => response)
    .catch((error) => new Error(error));
  return res;
}

function* getComment(action) {
  try {
    const result = yield call(getCommentAPI, action.data);
    yield put({
      type: COMMENT_GET_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: COMMENT_GET_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}

function getCommentAPI() {
  return axios.get('/post/paging?page=0&size=999&sort=createdDate,DESC');
}

function* deleteComment(action) {
  try {
    const result = yield call(deleteCommentAPI, action.data);
    yield put({
      type: COMMENT_DELETE_SUCCESS,
      data: result,
    });
  } catch (error) {
    yield put({
      type: COMMENT_DELETE_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}

function deleteCommentAPI(data) {
  const id = data;
  return axios.delete(`/post/${id}`);
}

function* watchCommentDelete() {
  yield takeLatest(COMMENT_DELETE_REQUEST, deleteComment);
}

function* watchCommentAdd() {
  yield takeLatest(COMMENT_ADD_REQUEST, addComment);
}

function* watchCommentGet() {
  yield takeLatest(COMMENT_GET_REQUEST, getComment);
}

export default function* commentSaga() {
  yield all([
    fork(watchCommentAdd),
    fork(watchCommentGet),
    fork(watchCommentDelete),
  ]);
}
