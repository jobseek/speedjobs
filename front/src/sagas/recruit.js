import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  RECRUIT_ADD_REQUEST,
  RECRUIT_ADD_SUCCESS,
  RECRUIT_LIST_FAIL,
  RECRUIT_LIST_REQUEST,
  RECRUIT_LIST_SUCCESS,
} from '../reducers/recruit';

function getRecruitListApi(action) {
  const { size, page } = action.data;
  const get = axios
    .get(`/post/paging/?size=${size}&page=${page}`)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return get;
}

function* getRecruitList(action) {
  try {
    const recruitList = yield call(getRecruitListApi, action);
    yield put({
      type: RECRUIT_LIST_SUCCESS,
      data: recruitList.data,
    });
  } catch (error) {
    yield put({
      type: RECRUIT_LIST_FAIL,
      error: 'error' ?? action.error,
    });
  }
}

function recruitAddApi(action) {
  return axios.post(`/post/new`, action.data).catch((err) => {
    throw err;
  });
}

function* recruitAdd(action) {
  try {
    const recruit = yield call(recruitAddApi, action);
    yield put({
      type: RECRUIT_ADD_SUCCESS,
      data: recruit.data,
    });
  } catch (error) {
    yield put({
      type: RECRUIT_LIST_FAIL,
      error: 'error' ?? action.error,
    });
  }
}

function* watchRecruitAdd() {
  yield takeLatest(RECRUIT_ADD_REQUEST, recruitAdd);
}

function* watchRecruitGet() {
  // yield takeLatest(RECRUIT_GET_REQUEST, getRecruit);
}

function* watchRecruitList() {
  yield takeLatest(RECRUIT_LIST_REQUEST, getRecruitList);
}

export default function* recruitSaga() {
  yield all([
    fork(watchRecruitGet),
    fork(watchRecruitList),
    fork(watchRecruitAdd),
  ]);
}
