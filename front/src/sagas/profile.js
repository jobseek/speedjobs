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

function getProfileApi(data) {
  // const { id } = data;
  console.log('data값 확인===', data);
  console.log('이게 멀까요??', data.id);
  console.log(data.role);
  if (data.role === 'ROLE_COMPANY') {
    return axios.get(`/user/company/${data.id}`);
  } else {
    return axios.get(`/user/member/${data.id}`);
  }
}

function* getProfile(action) {
  try {
    const result = yield call(getProfileApi, action.data);
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

function updateProfileApi(data, data2, me) {
  console.log('me?', me);
  console.log('data2', data2.role);
  if (data2.role === 'ROLE_COMPANY') {
    const res = axios
      .patch(`/user/company/${me}`, data)
      .then((response) => {
        return response;
      })
      .catch((err) => new Error(err));
    return res;
  } else {
    const res = axios
      .patch(`/user/member/${me}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => new Error(error));
    return res;
  }
}

function* updateProfile(action) {
  try {
    console.log('머지 인건?', action);
    const result = yield call(
      updateProfileApi,
      action.data,
      action.data2,
      action.me
    );
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
