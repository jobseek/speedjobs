import { all, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  COMPANY_ALLOW_FAIL,
  COMPANY_ALLOW_REQUEST,
  COMPANY_ALLOW_SUCCESS,
  ERROR,
  GET_BANNER_FAIL,
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
  POP_ALERT_DONE,
  POP_ALERT_REQUEST,
  USER_GET_FAIL,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
} from '../reducers/admin';

function* alertError(error, message) {
  yield put({
    type: ERROR,
    error: error.message ?? message,
  });
}

function* alert(message) {
  yield put({
    type: POP_ALERT_REQUEST,
    data: { message },
  });
}

function* alertDone(message) {
  yield put({
    type: POP_ALERT_DONE,
    data: { message },
  });
}

function getUserApi(action) {
  let role = '';
  console.log(action.data);
  if (action.data !== undefined) {
    role = 'role=' + action.data + '&';
  }
  return axios.get(`/user?${role}size=9999&page=0&sort.sorted=true`);
}

function* getUser(action) {
  try {
    yield alert('유저정보를 가져오는 중입니다');
    const userList = yield getUserApi(action);
    yield put({
      type: USER_GET_SUCCESS,
      data: userList.data,
    });
    yield alertDone('로딩이 완료되었습니다');
  } catch (error) {
    // 403일경우 권한 문제 메세지 전달 필요
    yield alertError(error, '불러오는 도중 문제가 발생하였습니다 ');
    yield put({
      type: USER_GET_FAIL,
      error: error.message ?? 'error',
    });
  }
}

function getBannerApi(action) {
  return axios.get('/banner');
}

function* getBanner(action) {
  try {
    yield alert('배너정보를 가져오는 중입니다');
    const banner = yield getBannerApi();
    yield put({
      type: GET_BANNER_SUCCESS,
      data: banner.data,
    });
    yield alertDone('배너정보를 가져왔습니다');
  } catch (error) {
    yield alertError(error, '배너를 가져오는 도중 문제가 발생하였습니다');
    yield put({
      type: GET_BANNER_FAIL,
      data: error.message ?? 'error',
    });
  }
}

function companyAllowApi(action) {
  return axios.patch(`/user/signup/company/${action.data.id}`);
}

function* companyAllow(action) {
  try {
    yield alert('승인중입니다');
    yield companyAllowApi(action);
    yield put({
      type: COMPANY_ALLOW_SUCCESS,
    });
  } catch (error) {
    yield alert(error, '승인중 문제가 발생하였습니다');
    yield put({
      type: COMPANY_ALLOW_FAIL,
      data: error.message ?? 'error',
    });
  }
}

function* watchCompanyAllow() {
  yield takeLatest(COMPANY_ALLOW_REQUEST, companyAllow);
}

function* watchGetBanner() {
  yield takeLatest(GET_BANNER_REQUEST, getBanner);
}

function* watchGetUser() {
  yield takeLatest(USER_GET_REQUEST, getUser);
}

export default function* adminSaga() {
  yield all([watchGetUser(), watchGetBanner(), watchCompanyAllow()]);
}
