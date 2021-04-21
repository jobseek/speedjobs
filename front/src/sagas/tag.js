import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  TAG_ADD_FAIL,
  TAG_ADD_REQUEST,
  TAG_ADD_SUCCESS,
  TAG_DELETE_FAIL,
  TAG_DELETE_REQUEST,
  TAG_DELETE_SUCCESS,
  TAG_EDIT_FAIL,
  TAG_EDIT_REQUEST,
  TAG_EDIT_SUCCESS,
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
function editTagApi(tag) {
  return axios.put(`/tag/${tag.id}`, { name: tag.name, type: tag.type });
}

function* editTag(action) {
  try {
    yield call(editTagApi, action.data);
    yield put({
      type: TAG_EDIT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: TAG_EDIT_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}
function deleteTagApi(tag) {
  return axios.delete(`/tag/${tag.id}`);
}

function* deleteTag(action) {
  try {
    const result = yield call(deleteTagApi, action.data);
    yield put({
      type: TAG_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: TAG_DELETE_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}

function addTagApi(tag) {
  console.log(tag);
  return axios.post(`/tag/`, { tagName: tag.name, tagType: tag.type });
}

function* addTag(action) {
  try {
    const result = yield call(addTagApi, action.data);
    yield put({
      type: TAG_ADD_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: TAG_ADD_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}
function* watchTagGet() {
  yield takeLatest(TAG_GET_REQUEST, getTag);
}
function* watchTagEdit() {
  yield takeLatest(TAG_EDIT_REQUEST, editTag);
}
function* watchTagDelete() {
  yield takeLatest(TAG_DELETE_REQUEST, deleteTag);
}

function* watchTagAdd() {
  yield takeLatest(TAG_ADD_REQUEST, addTag);
}

export default function* tagSaga() {
  yield all([
    fork(watchTagGet),
    fork(watchTagEdit),
    fork(watchTagAdd),
    fork(watchTagDelete),
  ]);
}
