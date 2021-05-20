import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  PROFILE_DELETE_FAIL,
  PROFILE_DELETE_REQUEST,
  PROFILE_DELETE_SUCCESS,
  PROFILE_GET_FAIL,
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
} from '../reducers/profile';

function getProfileApi(action) {
  const role = action.me.role;
  const me = action.me.id;
  if (role === 'ROLE_MEMBER') {
    return axios.get(`/user/member/${me}`);
  } else {
    return axios.get(`/user/company/${me}`);
  }
}

function* getProfile(action) {
  try {
    const result = yield call(getProfileApi, action);
    yield put({
      type: PROFILE_GET_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: PROFILE_GET_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}

function updateProfileApi(action) {
  const { data, me } = action;
  const userId = me.id;
  const role = me.role;
  if (role === 'ROLE_MEMBER') {
    return axios.patch(`/user/member/${userId}`, data).catch((err) => {
      throw err;
    });
  } else {
    return axios.patch(`/user/company/${userId}`, data).catch((err) => {
      throw err;
    });
  }
}

function* updateProfile(action) {
  try {
    const result = yield call(updateProfileApi, action);
    yield put({
      type: PROFILE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: PROFILE_UPDATE_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}

function deleteProfileApi(action) {
  const { data, me } = action;
  return axios.delete(`/user/${me.id}`, { data });
}

function* deleteProfile(action) {
  try {
    const result = yield call(deleteProfileApi, action);
    yield put({
      type: PROFILE_DELETE_SUCCESS,
      data: result,
    });
  } catch (error) {
    yield put({
      type: PROFILE_DELETE_FAIL,
      error: error.response.status,
    });
  }
}

function* watchProfileGet() {
  yield takeLatest(PROFILE_GET_REQUEST, getProfile);
}

function* watchProfileUpdate() {
  yield takeLatest(PROFILE_UPDATE_REQUEST, updateProfile);
}

function* watchProfileDelete() {
  yield takeLatest(PROFILE_DELETE_REQUEST, deleteProfile);
}

export default function* profileSaga() {
  yield all([
    fork(watchProfileGet),
    fork(watchProfileUpdate),
    fork(watchProfileDelete),
  ]);
}
