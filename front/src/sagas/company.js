import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  APPLY_LIST_FAIL,
  APPLY_LIST_REQUEST,
  APPLY_LIST_SUCCESS,
  COMPANY_GET_FAIL,
  COMPANY_GET_REQUEST,
  COMPANY_GET_SUCCESS,
} from '../reducers/company';

// 기업회원 상세정보 조회
function getCompanyInfoAPI(data) {
  const { id } = data;
  const info = axios
    .get(`/user/${id}`)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });

  return info;
}

function* getCompanyInfo(action) {
  try {
    const result = yield call(getCompanyInfoAPI, action.data);
    yield put({
      type: COMPANY_GET_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: COMPANY_GET_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}

// 공고에 지원된 이력서 조회
function getApplyListAPI(data) {
  const res = axios
    .get(`/apply/company/${data}`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
  return res;
}

function* getApplyList(action) {
  try {
    const result = yield call(getApplyListAPI, action.data);
    yield put({
      type: APPLY_LIST_SUCCESS,
      data: result.data,
      id: action.data,
    });
  } catch (error) {
    yield put({
      type: APPLY_LIST_FAIL,
      data: '에러' ?? error.response.data,
    });
  }
}

function* watchGetCompany() {
  yield takeLatest(COMPANY_GET_REQUEST, getCompanyInfo);
}

function* watchApplyList() {
  yield takeLatest(APPLY_LIST_REQUEST, getApplyList);
}

export default function* companySaga() {
  yield all([fork(watchGetCompany), fork(watchApplyList)]);
}
