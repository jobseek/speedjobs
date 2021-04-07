import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  POST_ADD_FAIL,
  POST_ADD_REQUEST,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
} from '../reducers/post';

function getPostListApi(action) {
  const { size, page } = action.data;
  const get = axios
    .get(`/post/paging/?size=${size}&page=${page}`)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return get;
}

function* getPostList(action) {
  try {
    const postList = yield call(getPostListApi, action);
    yield put({
      type: POST_LIST_SUCCESS,
      data: postList.data,
    });
  } catch (error) {
    yield put({
      type: POST_LIST_FAIL,
      error: 'error' ?? action.error,
    });
  }
}

function postAddApi(action) {
  return axios.post('/post/new', action.data).catch((err) => {
    throw err;
  });
}

function* postAdd(action) {
  try {
    const post = yield call(postAddApi, action);
    yield put({
      type: POST_LIST_SUCCESS,
      data: post.data,
    });
  } catch (error) {
    yield put({
      type: POST_ADD_FAIL,
      error: 'error' ?? action.error,
    });
  }
}

function* watchPostAdd() {
  yield takeLatest(POST_ADD_REQUEST, postAdd);
}

function* watchPostGet() {
  // yield takeLatest(POST_GET_REQUEST, getPost);
}
function* watchPostList() {
  yield takeLatest(POST_LIST_REQUEST, getPostList);
}
export default function* postSaga() {
  yield all([fork(watchPostGet), fork(watchPostList), fork(watchPostAdd)]);
}
