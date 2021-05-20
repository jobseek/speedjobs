import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  POST_ADD_FAIL,
  POST_ADD_REQUEST,
  POST_ADD_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_GET_FAIL,
  POST_GET_REQUEST,
  POST_GET_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SEARCHBAR_SUCCESS,
  POST_LIST_SUCCESS,
  POST_MODIFY_FAIL,
  POST_MODIFY_REQUEST,
  POST_MODIFY_SUCCESS,
} from '../reducers/post';

async function getPostListApi(action) {
  // eslint-disable-next-line
  let { size, page, searchBar, order, ...search } = action.data;
  if (order === undefined) {
    order = 'id';
  }
  const searchText =
    (await Object.entries(search)
      .map((e) => `${e[0]}=${e[1]}`)
      .join('&')) + (Object.entries(search).length !== 0 ? '&' : '');
  console.log('searchText= ', searchText);
  return axios.get(
    `/post?${searchText}size=${size}&page=${page}&sort=${order},DESC`
  );
}

function* getPostList(action) {
  try {
    const postList = yield call(getPostListApi, action);
    if (action.data.searchBar !== undefined) {
      yield put({
        type: POST_LIST_SEARCHBAR_SUCCESS,
        data: postList.data,
      });
    } else {
      yield put({
        type: POST_LIST_SUCCESS,
        data: postList.data,
      });
    }
  } catch (error) {
    yield put({
      type: POST_LIST_FAIL,
      error: 'error' ?? action.error,
    });
  }
}

function postAddApi(action) {
  return axios.post('/post', action.data).catch((err) => {
    throw err;
  });
}

function* postAdd(action) {
  try {
    const post = yield call(postAddApi, action);
    yield put({
      type: POST_ADD_SUCCESS,
      data: post.data,
    });
  } catch (error) {
    yield put({
      type: POST_ADD_FAIL,
      error: 'error' ?? action.error,
    });
  }
}

function postGetApi(action) {
  return axios.get(`/post/${action.data}`).catch((err) => {
    throw err;
  });
}

function* postGet(action) {
  try {
    const post = yield call(postGetApi, action);
    yield put({
      type: POST_GET_SUCCESS,
      data: post.data,
    });
  } catch (error) {
    yield put({
      type: POST_GET_FAIL,
      error: 'error' ?? action.error,
    });
  }
}

function postDeleteAPI(data) {
  const res = axios.delete(`/post/${data}`).catch((error) => {
    throw error;
  });
  return res;
}

function* postDelete(action) {
  try {
    const result = yield call(postDeleteAPI, action.data);
    yield put({
      type: POST_DELETE_SUCCESS,
      data: result,
    });
  } catch (error) {
    yield put({
      type: POST_DELETE_FAIL,
      data: 'error' ?? action.error,
    });
  }
}

function postModifyAPI(action) {
  console.log(action);
  const res = axios
    .put(`/post/${action.postId}`, action.data)
    .catch((error) => {
      throw error;
    });
  return res;
}

function* postModify(action) {
  try {
    const result = yield call(postModifyAPI, action);
    yield put({
      type: POST_MODIFY_SUCCESS,
      data: result,
    });
  } catch (error) {
    yield put({
      type: POST_MODIFY_FAIL,
      data: 'error' ?? action.error,
    });
  }
}

function* watchPostAdd() {
  yield takeLatest(POST_ADD_REQUEST, postAdd);
}

function* watchPostGet() {
  yield takeLatest(POST_GET_REQUEST, postGet);
}

function* watchPostList() {
  yield takeLatest(POST_LIST_REQUEST, getPostList);
}

function* watchPostDelete() {
  yield takeLatest(POST_DELETE_REQUEST, postDelete);
}

function* watchPostModify() {
  yield takeLatest(POST_MODIFY_REQUEST, postModify);
}

export default function* postSaga() {
  yield all([
    fork(watchPostGet),
    fork(watchPostList),
    fork(watchPostAdd),
    fork(watchPostDelete),
    fork(watchPostModify),
  ]);
}
