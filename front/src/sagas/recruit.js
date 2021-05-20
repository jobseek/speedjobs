import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_CHAT_FAIL,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
  RECRUIT_ADD_REQUEST,
  RECRUIT_ADD_SUCCESS,
  RECRUIT_DELETE_FAIL,
  RECRUIT_DELETE_REQUEST,
  RECRUIT_DELETE_SUCCESS,
  RECRUIT_GET_FAIL,
  RECRUIT_GET_REQUEST,
  RECRUIT_GET_SUCCESS,
  RECRUIT_LIST_FAIL,
  RECRUIT_LIST_REQUEST,
  RECRUIT_LIST_SEARCHBAR_SUCCESS,
  RECRUIT_LIST_SUCCESS,
  RECRUIT_MODIFY_FAIL,
  RECRUIT_MODIFY_REQUEST,
  RECRUIT_MODIFY_SUCCESS,
} from '../reducers/recruit';

// 공고 목록 불러오기
async function getRecruitListApi(action) {
  // eslint-disable-next-line
  let { size, page, searchBar, order, ...search } = action.data;
  if (order === undefined) {
    order = 'id';
  }
  const searchText =
    (await Object.entries(search)
      .map((e) => `${e[0]}=${e[1]}`)
      .join('&')) + (Object.entries(search).length !== 0 ? '&' : '');
  console.log('searchText= ', searchText);
  return axios.get(
    `/recruit?${searchText}size=${size}&page=${page}&sort=${order},DESC`
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

// 공고 상세 불러오기
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

// 공고 추가하기
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

// 공고 채팅
function getChatApi(action) {
  return axios.get(`/chat/${action.data}`);
}

function* getChat(action) {
  try {
    const result = yield call(getChatApi, action);
    yield put({
      type: GET_CHAT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: GET_CHAT_FAIL,
      data: error ?? 'error',
    });
  }
}

// 공고 수정하기 -> api id 체크 필요
function modifyRecruitAPI(data) {
  return axios.put(`/recruit/${data}`).catch((error) => {
    throw error;
  });
}

function* modifyRecruit(action) {
  try {
    const result = yield call(modifyRecruitAPI, action.data);
    yield put({
      type: RECRUIT_MODIFY_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: RECRUIT_MODIFY_FAIL,
      data: error ?? 'error',
    });
  }
}

// 공고 삭제하기
function deleteRecruitAPI(data) {
  return axios.delete(`/recruit/${data}`).catch((error) => {
    throw error;
  });
}

function* deleteRecruit(action) {
  try {
    const result = yield call(deleteRecruitAPI, action.data);
    yield put({
      type: RECRUIT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: RECRUIT_DELETE_FAIL,
      data: error ?? 'error',
    });
  }
}

function* watchGetChat() {
  yield takeLatest(GET_CHAT_REQUEST, getChat);
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

function* watchRecruitModify() {
  yield takeLatest(RECRUIT_MODIFY_REQUEST, modifyRecruit);
}

function* watchRecruitDelete() {
  yield takeLatest(RECRUIT_DELETE_REQUEST, deleteRecruit);
}

export default function* recruitSaga() {
  yield all([
    fork(watchGetChat),
    fork(watchRecruitGet),
    fork(watchRecruitList),
    fork(watchRecruitAdd),
    fork(watchRecruitModify),
    fork(watchRecruitDelete),
  ]);
}
