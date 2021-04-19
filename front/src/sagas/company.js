import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  COMPANY_GET_FAIL,
  COMPANY_GET_REQUEST,
  COMPANY_GET_SUCCESS,
} from '../reducers/company';

function getCompanyInfoAPI(data) {
  const { id } = data;
  const info = axios
    .get(`/user/company/${id}`)
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

function* watchGetCompany() {
  yield takeLatest(COMPANY_GET_REQUEST, getCompanyInfo);
}

export default function* companySaga() {
  yield all([fork(watchGetCompany)]);
}
