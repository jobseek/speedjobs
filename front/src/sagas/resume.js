import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  RESUME_ADD_FAIL,
  RESUME_ADD_REQUEST,
  RESUME_ADD_SUCCESS,
  RESUME_APPLY_FAIL,
  RESUME_APPLY_REQUEST,
  RESUME_APPLY_SUCCESS,
  RESUME_GET_FAIL,
  RESUME_GET_REQUEST,
  RESUME_GET_SUCCESS,
  RESUME_LIST_FAIL,
  RESUME_LIST_REQUEST,
  RESUME_LIST_SUCCESS,
} from '../reducers/resume';

// ========== 이력서 목록 ==========
function resumeListAPI(data) {
  return axios.get('/resume').catch((error) => {
    throw error;
  });
}

function* resumeList(action) {
  try {
    const result = yield call(resumeListAPI, action.data);
    yield put({
      type: RESUME_LIST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: RESUME_LIST_FAIL,
      data: 'error' ?? action.error,
    });
  }
}

// ========== 이력서 추가 ==========
function resumeAddApi(action) {
  return axios.post('/resume', action.data).catch((err) => {
    throw err;
  });
}

function* resumeAdd(action) {
  try {
    const resume = yield call(resumeAddApi, action);
    yield put({
      type: RESUME_ADD_SUCCESS,
      data: resume.data,
    });
  } catch (error) {
    yield put({
      type: RESUME_ADD_FAIL,
      error: 'error' ?? action.error,
    });
  }
}

// ========== 이력서 조회 ==========
function resumeGetAPI(data) {
  return axios.get(`/resume/${data.data}`).catch((err) => {
    throw err;
  });
}

function* resumeGet(action) {
  try {
    const resume = yield call(resumeGetAPI, action);
    yield put({
      type: RESUME_GET_SUCCESS,
      data: resume.data,
    });
  } catch (error) {
    yield put({
      type: RESUME_GET_FAIL,
      error: 'error' ?? action.error,
    });
  }
}

// ========= 이력서 지원 =========
function resumeApplyAPI(data) {
  const { recruitId, resumeId } = data;
  return axios.post(`/recruit/${recruitId}/resume/${resumeId}`).catch((err) => {
    throw err;
  });
}

function* resumeApply(action) {
  try {
    const result = yield call(resumeApplyAPI, action.data);
    yield put({
      type: RESUME_APPLY_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: RESUME_APPLY_FAIL,
      data: 'error' ?? action.error,
    });
  }
}

function* watchResumeList() {
  yield takeLatest(RESUME_LIST_REQUEST, resumeList);
}
function* watchResumeAdd() {
  yield takeLatest(RESUME_ADD_REQUEST, resumeAdd);
}
function* watchResumeGet() {
  yield takeLatest(RESUME_GET_REQUEST, resumeGet);
}
function* watchResumeApply() {
  yield takeLatest(RESUME_APPLY_REQUEST, resumeApply);
}

export default function* resumeSaga() {
  yield all([
    fork(watchResumeList),
    fork(watchResumeAdd),
    fork(watchResumeGet),
    fork(watchResumeApply),
  ]);
}
