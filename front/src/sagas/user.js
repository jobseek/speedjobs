import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  // LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  ME_FAILURE,
  ME_REQUEST,
  ME_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducers/user';

function logInAPI(data) {
  const res = axios
    .post('/auth/login', data)
    .then((response) => response)
    .catch((err) => new Error(err));
  return res;
}

function logInAfterApi(data) {
  // console.log(data);
  // eslint-disable-next-line
  axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
  return null;
}

function getUserApi() {
  // 로그인된 정보를 조회
  return axios.get('/user/me');
}
function* getMe(action) {
  try {
    const result = yield call(getUserApi);
    yield put({
      type: ME_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: ME_FAILURE,
      error: '에러' ?? error.response.data,
    });
  }
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    // 보안 굳이 이해하실 필요 없습니다
    logInAfterApi(result.data);

    const userInfo = yield call(getUserApi);

    yield put({
      type: LOG_IN_SUCCESS,
      data: userInfo.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      error: '에러' ?? error.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/auth/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT_SUCCESS,
    });
    // console.error(error);
    // yield put({
    //   type: LOG_OUT_FAILURE,
    //   error: error.response.data,
    // });
  }
}

function signUpAPI(data) {
  console.log(data);
  return axios.post('/user/signup', data);
}

function* signUp(action) {
  console.log(action);
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: '포스팅중 예외발생. 서버를 확인하세요' ?? error.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchME() {
  yield takeLatest(ME_REQUEST, getMe);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchME),
  ]);
}
