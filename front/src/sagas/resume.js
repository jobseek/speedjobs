import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  RESUME_ADD_FAIL,
  RESUME_ADD_REQUEST,
  RESUME_ADD_SUCCESS,
  RESUME_APPLY_FAIL,
  RESUME_APPLY_REQUEST,
  RESUME_APPLY_SUCCESS,
  RESUME_DELETE_FAIL,
  RESUME_DELETE_REQUEST,
  RESUME_DELETE_SUCCESS,
  RESUME_GET_FAIL,
  RESUME_GET_REQUEST,
  RESUME_GET_SUCCESS,
  RESUME_LIST_FAIL,
  RESUME_LIST_REQUEST,
  RESUME_LIST_SUCCESS,
  RESUME_MODIFY_FAIL,
  RESUME_MODIFY_REQUEST,
  RESUME_MODIFY_SUCCESS,
} from '../reducers/resume';

// ========== 이력서 목록 ==========
function resumeListAPI() {
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
function resumeGetAPI(action) {
  return axios.get(`/resume/${action.data}`).catch((err) => {
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

// ========= 이력서 삭제 =========
function resumeDeleteApi(data) {
  const res = axios.delete(`/resume/${data}`).catch((error) => {
    throw error;
  });
  return res;
}

function* resumeDelete(action) {
  try {
    const result = yield call(resumeDeleteApi, action.data);
    yield put({
      type: RESUME_DELETE_SUCCESS,
      data: result,
    });
  } catch (error) {
    yield put({
      type: RESUME_DELETE_FAIL,
      data: 'error' ?? action.error,
    });
  }
}

// ========= 이력서 수정 =========
function resumeModifyApi(data) {
  const res = axios.put(`/resume/${data.id}`, data).catch((error) => {
    throw error;
  });
  return res;
}

function* resumeModify(action) {
  try {
    const resume = yield call(resumeModifyApi, action.data);
    yield put({
      type: RESUME_MODIFY_SUCCESS,
      data: resume,
    });
  } catch (error) {
    yield put({
      type: RESUME_MODIFY_FAIL,
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

function* watchResumeDelete() {
  yield takeLatest(RESUME_DELETE_REQUEST, resumeDelete);
}

function* watchResumeModify() {
  yield takeLatest(RESUME_MODIFY_REQUEST, resumeModify);
}

export default function* resumeSaga() {
  yield all([
    fork(watchResumeList),
    fork(watchResumeAdd),
    fork(watchResumeGet),
    fork(watchResumeApply),
    fork(watchResumeDelete),
    fork(watchResumeModify),
  ]);
}
