import axios from 'axios';
import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import {
  COMMENT_ADD_FAIL,
  COMMENT_ADD_REQUEST,
  COMMENT_ADD_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_FAV_FAIL,
  COMMENT_FAV_REQUEST,
  COMMENT_FAV_SUCCESS,
  COMMENT_GET_FAIL,
  COMMENT_GET_REQUEST,
  COMMENT_GET_SUCCESS,
  COMMENT_HATE_FAIL,
  COMMENT_HATE_REQUEST,
  COMMENT_HATE_SUCCESS,
  COMMENT_MODIFY_FAIL,
  COMMENT_MODIFY_REQUEST,
  COMMENT_MODIFY_SUCCESS,
} from '../reducers/comment';

// 댓글 추가
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    console.log('result= ', result.data);
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
    .post(`/post/${data.id}/comment`, {
      content: data.content,
    })
    .then((response) => response)
    .catch((error) => new Error(error));
  console.log('res= ', res);
  return res;
}

// 댓글 목록
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

function getCommentAPI(data) {
  return axios.get(`/post/${data}/comments`);
}

// 댓글 삭제
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
  const { comment, post } = data;
  return axios.delete(`/post/${post}/comment/${comment}`);
}

// 댓글 수정
function* modifyComment(action) {
  try {
    const result = yield call(modifyCommentAPI, action.data);
    yield put({
      type: COMMENT_MODIFY_SUCCESS,
      data: result,
    });
  } catch (error) {
    yield put({
      type: COMMENT_MODIFY_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}

function modifyCommentAPI(data) {
  const { post, comment } = data;
  return axios.put(`/post/${post}/comment/${comment}`, { content: data.diff });
}

// 댓글 좋아요
function* favComment(action) {
  try {
    const result = yield call(favCommentAPI, action.data);
    console.log('result= ', result);
    yield put({
      type: COMMENT_FAV_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: COMMENT_FAV_FAIL,
    });
  }
}

function favCommentAPI(data) {
  const { post, comment } = data;
  return axios.post(`/post/${post}/comment/${comment}/favorite`);
}

// 댓글 좋아요 취소
function* hateComment(action) {
  try {
    yield call(hateCommentAPI, action.data);
    yield put({
      type: COMMENT_HATE_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: COMMENT_HATE_FAIL,
    });
  }
}

function hateCommentAPI(data) {
  const { post, comment } = data;
  return axios.delete(`/post/${post}/comment/${comment}/favorite`);
}

function* watchCommentModify() {
  yield takeLatest(COMMENT_MODIFY_REQUEST, modifyComment);
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

function* watchCommentFav() {
  yield takeLatest(COMMENT_FAV_REQUEST, favComment);
}

function* watchCommentHate() {
  yield takeLatest(COMMENT_HATE_REQUEST, hateComment);
}

export default function* commentSaga() {
  yield all([
    fork(watchCommentAdd),
    fork(watchCommentGet),
    fork(watchCommentDelete),
    fork(watchCommentModify),
    fork(watchCommentFav),
    fork(watchCommentHate),
  ]);
}
