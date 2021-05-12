import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_DONE,
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

function getUserApi(data) {
  console.log(data);
  return axios.get('/user/me', {
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
  });
}
function getUserOnly(data) {
  console.log(data);
  return axios.get('/user/me', {
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
  });
}

function* getMe(action) {
  try {
    const result = yield call(getUserOnly, action.data);
    yield (axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${action.data.accessToken}`);
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

    const userInfo = yield call(getUserApi, result.data);

    yield (axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${result.data.accessToken}`);

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
  return axios.get('/auth/logout');
}

function* logOut(action) {
  try {
    yield call(logOutAPI);
    delete axios.defaults.headers.common.Authorization;
    delete axios.defaults.headers.Authorization;
    console.log(action.data);
    if (action.data === 'no-redirect') {
      yield put({
        type: LOG_OUT_DONE,
      });
    } else {
      yield put({
        type: LOG_OUT_SUCCESS,
      });
    }
    // 쿠키삭제
    yield document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  } catch (error) {
    if (action.data === 'no-redirect') {
      yield put({
        type: LOG_OUT_DONE,
      });
    } else {
      yield put({
        type: LOG_OUT_SUCCESS,
      });
    }
  }
}

function signUpAPI(data) {
  if (data.role === 'ROLE_MEMBER') {
    return axios.post('/user/signup/member', data);
  } else {
    return axios.post('/user/signup/company', data);
  }
}

function* signUp(action) {
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
