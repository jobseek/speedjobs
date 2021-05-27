import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  COMPANY_ALLOW_FAIL,
  COMPANY_ALLOW_REQUEST,
  COMPANY_ALLOW_SUCCESS,
  DELETE_BANNER_FAIL,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  ERROR,
  GET_BANNER_FAIL,
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  POP_ALERT_DONE,
  POP_ALERT_REQUEST,
  SET_BANNER_FAIL,
  SET_BANNER_REQUEST,
  SET_BANNER_SUCCESS,
  USER_GET_FAIL,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
} from '../reducers/admin';
import { POST_GET_FAIL } from '../reducers/post';

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
    yield alertError(error, '승인중 문제가 발생하였습니다');
    yield put({
      type: COMPANY_ALLOW_FAIL,
      data: error.message ?? 'error',
    });
  }
}

function setBannerApi(action) {
  return axios.post('/banner', action.data.files);
}

function preSetBannerApi(action) {
  console.log(action.data);
  const data = new FormData();
  // action.data.forEach((d) => {
  //   data.append('files', d);
  // });
  data.append('files', action.data);
  console.log(data);
  return axios.post('/file', data);
}

function* setBanner(action) {
  try {
    yield alert('배너를 추가중입니다');
    const data = yield preSetBannerApi(action);
    yield call(setBannerApi, data);
    yield put({
      type: SET_BANNER_SUCCESS,
    });
  } catch (error) {
    yield alertError(error, '추가실패');
    yield put({
      type: SET_BANNER_FAIL,
      data: error.message ?? 'error',
    });
  }
}

function* watchSetBanner() {
  yield takeLatest(SET_BANNER_REQUEST, setBanner);
}

function deleteBannerApi(action) {
  return axios.delete(`/banner/${action.data}`);
}

function* deleteBanner(action) {
  try {
    yield alert('배너를 삭제중입니다');
    yield call(deleteBannerApi, action);
    yield put({
      type: DELETE_BANNER_SUCCESS,
    });
  } catch (error) {
    yield alertError(error, '삭제실패');
    yield put({
      type: DELETE_BANNER_FAIL,
      data: error.message ?? 'error',
    });
  }
}

function* watchDeleteBanner() {
  yield takeLatest(DELETE_BANNER_REQUEST, deleteBanner);
}
function getPostApi(action) {
  return axios.get(`/post?size=99999&page=0&createdDate=${action.data}`);
}

function getRecruitApi(action) {
  return axios.get(`/recruit?size=99999&page=0&createdDate=${action.data}`);
}

function* getPost(action) {
  try {
    const post = yield call(getPostApi, action);
    const recruit = yield call(getRecruitApi, action);
    yield put({
      type: GET_POST_SUCCESS,
      data: { post: post.data, recruit: recruit.data },
    });
  } catch (error) {
    yield alertError(error, '포스트를 로딩하지 못했습니다');
    yield put({
      type: POST_GET_FAIL,
      data: error.message ?? 'error',
    });
  }
}

function deleteUserApi(action) {
  return axios.delete(`/user/${action.data}`, {
    data: { password: 'Aa12345678' },
  });
}

function* deleteUser(action) {
  try {
    yield alert('삭제중입니다');
    yield call(deleteUserApi, action);
    yield put({
      type: DELETE_USER_SUCCESS,
    });
  } catch (error) {
    console.log('fail');
    yield alertError(error, '삭제에 실패하였습니다');
    yield put({
      type: DELETE_USER_FAIL,
      data: error.message ?? 'error',
    });
  }
}

function* watchDeleteUser() {
  yield takeLatest(DELETE_USER_REQUEST, deleteUser);
}

function* watchGetPost() {
  yield takeLatest(GET_POST_REQUEST, getPost);
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
  yield all([
    watchGetUser(),
    watchGetBanner(),
    watchCompanyAllow(),
    watchGetPost(),
    watchDeleteUser(),
    watchSetBanner(),
    watchDeleteBanner(),
  ]);
}
