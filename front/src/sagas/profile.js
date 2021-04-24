import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  PROFILE_GET_FAIL,
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
} from '../reducers/profile';

function getProfileApi(data) {
  // const { id } = data;
  return axios.get(`/user/member/${data}`);
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

function updateProfileApi(data, me) {
  console.log(me);
  const res = axios
    .patch(`/user/member/${me}`, data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => new Error(error));
  return res;
}

function* updateProfile(action) {
  try {
    console.log(action);
    console.log('profile이이이이이이이');
    const result = yield call(updateProfileApi, action.data, action.me);
    console.log('결과', result);
    yield put({
      type: PROFILE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log('잉????');
    yield put({
      type: PROFILE_UPDATE_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}

function* watchProfileGet() {
  yield takeLatest(PROFILE_GET_REQUEST, getProfile);
}

function* watchProfileUpdate() {
  yield takeLatest(PROFILE_UPDATE_REQUEST, updateProfile);
}

export default function* profileSaga() {
  yield all([fork(watchProfileGet), fork(watchProfileUpdate)]);
}
