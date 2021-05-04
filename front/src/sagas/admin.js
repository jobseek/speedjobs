import { all, takeLatest, put, delay } from 'redux-saga/effects';
import { ERROR, POP_ALERT_DONE, POP_INIT } from '../reducers/admin';

function* popInit(action) {
  yield delay(2500);
  yield put({
    type: POP_INIT,
  });
}

function* watchPopInit() {
  yield takeLatest([POP_ALERT_DONE, ERROR], popInit);
}
export default function* adminSaga() {
  yield all([watchPopInit()]);
}
