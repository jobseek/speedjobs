import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  RESUME_ADD_FAIL,
  RESUME_ADD_REQUEST,
  RESUME_ADD_SUCCESS,
  RESUME_GET_FAIL,
  RESUME_GET_REQUEST,
  RESUME_GET_SUCCESS,
} from '../reducers/resume';

// ========== 이력서 추가 ==========
function resumeAddApi(action) {
  return axios.post('/resume', action.data).catch((err) => {
    throw err;
  });
}

function* resumeAdd(action) {
  console.log('=== action ===', action);
  console.log('=== action.data ===', action.data);

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
  console.log('=== data.data.id ===', data.data.id);
  const id = data.data.id;
  return axios.get(`/resume/${id}`).catch((err) => {
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

function* watchResumeAdd() {
  yield takeLatest(RESUME_ADD_REQUEST, resumeAdd);
}
function* watchResumeGet() {
  yield takeLatest(RESUME_GET_REQUEST, resumeGet);
}

export default function* resumeSaga() {
  yield all([fork(watchResumeAdd), fork(watchResumeGet)]);
}
