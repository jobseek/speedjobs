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
  COMMENT_MODIFY_FAIL,
  COMMENT_MODIFY_REQUEST,
  COMMENT_MODIFY_SUCCESS,
} from '../reducers/comment';

// 댓글 추가
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
    .post(`/post/${data.id}/comment`, {
      content: data.content,
    })
    .then((response) => response)
    .catch((error) => new Error(error));
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
  const { commentId, postId } = data;
  return axios.delete(`/post/${postId}/comment/${commentId}`);
}

function* modifyComment(action) {
  try {
    console.log('action=', action.data);
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

export default function* commentSaga() {
  yield all([
    fork(watchCommentAdd),
    fork(watchCommentGet),
    fork(watchCommentDelete),
    fork(watchCommentModify),
  ]);
}
