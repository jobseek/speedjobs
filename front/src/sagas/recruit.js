import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  RECRUIT_ADD_REQUEST,
  RECRUIT_ADD_SUCCESS,
  RECRUIT_GET_FAIL,
  RECRUIT_GET_REQUEST,
  RECRUIT_GET_SUCCESS,
  RECRUIT_LIST_FAIL,
  RECRUIT_LIST_REQUEST,
  RECRUIT_LIST_SEARCHBAR_SUCCESS,
  RECRUIT_LIST_SUCCESS,
} from '../reducers/recruit';

async function getRecruitListApi(action) {
  // eslint-disable-next-line
  const { size, page, searchBar, ...search } = action.data;
  const searchText =
    (await Object.entries(search)
      .map((e) => `${e[0]}=${e[1]}`)
      .join('&')) + (Object.entries(search).length !== 0 ? '&' : '');
  return axios.get(
    `/recruit?${searchText}size=${size}&page=${page}&sort=id,DESC`
  );
}

function* getRecruitList(action) {
  try {
    const recruitList = yield call(getRecruitListApi, action);
    if (action.data.searchBar !== undefined) {
      yield put({
        type: RECRUIT_LIST_SEARCHBAR_SUCCESS,
        data: recruitList.data,
      });
    } else {
      yield put({
        type: RECRUIT_LIST_SUCCESS,
        data: recruitList.data,
      });
    }
  } catch (error) {
    yield put({
      type: RECRUIT_LIST_FAIL,
      error: 'error' ?? action.error,
    });
  }
}

function getRecruitApi(action) {
  const get = axios
    .get(`/recruit/${action.data}`)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return get;
}

function* getRecruit(action) {
  try {
    const recruitList = yield call(getRecruitApi, action);
    yield put({
      type: RECRUIT_GET_SUCCESS,
      data: recruitList.data,
    });
  } catch (error) {
    yield put({
      type: RECRUIT_GET_FAIL,
      error: 'error' ?? action.error,
    });
  }
}

function recruitAddApi(action) {
  return axios.post(`/recruit`, action.data).catch((err) => {
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
  yield takeLatest(RECRUIT_GET_REQUEST, getRecruit);
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
