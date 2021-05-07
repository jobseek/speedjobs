import produce from 'immer';

export const initialState = {
  alertMessage: '',
  pop: false,
  popEnter: false,
  popDone: false,
  timeOut: 0,
  error: null,
  initDone: false,
  getUserLoading: false,
  getUserDone: false,
  getUserFail: false,
  adminError: null,
  getUserList: null,
  getBannerLoading: false,
  getBannerDone: false,
  getBannerFail: false,
  getBannerList: null,
};
export const POP_ALERT_REQUEST = 'POP_ALERT_REQUEST';
export const POP_ALERT_DONE = 'POP_ALERT_DONE';
export const POP_INIT = 'POP_INIT';

export const USER_GET_REQUEST = 'USER_GET_REQUEST';
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const USER_GET_DONE = 'USER_GET_DONE';
export const USER_GET_FAIL = 'USER_GET_FAIL';

export const GET_BANNER_REQUEST = 'GET_BANNER_REQUEST';
export const GET_BANNER_SUCCESS = 'GET_BANNER_SUCCESS';
export const GET_BANNER_DONE = 'GET_BANNER_DONE';
export const GET_BANNER_FAIL = 'GET_BANNER_FAIL';

export const ERROR = 'ERROR';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POP_ALERT_REQUEST:
        draft.alertMessage = action.data.message;
        draft.pop = true;
        draft.popEnter = true;
        draft.initDone = false;
        draft.popDone = false;
        draft.error = null;
        break;
      case POP_ALERT_DONE:
        draft.pop = false;
        draft.alertMessage = action.data.message;
        draft.popDone = true;
        draft.popEnter = false;
        break;
      case POP_INIT:
        draft.popDone = false;
        draft.alertMessage = '';
        draft.pop = false;
        draft.error = null;
        draft.initDone = true;
        break;
      case ERROR:
        draft.pop = false;
        draft.popDone = false;
        draft.popEnter = false;
        draft.error = action.error ?? 'error';
        break;
      case USER_GET_REQUEST:
        draft.getUserLoading = true;
        break;
      case USER_GET_FAIL:
        draft.getUserLoading = false;
        draft.getUserFail = true;
        draft.adminError = action.error ?? 'error';
        break;
      case USER_GET_SUCCESS:
        draft.getUserLoading = false;
        draft.getUserDone = true;
        draft.getUserList = action.data;
        break;
      case USER_GET_DONE:
        draft.getUserDone = false;
        draft.adminError = null;
        draft.getUserFail = false;
        draft.getUserList = null;
        break;
      case GET_BANNER_REQUEST:
        draft.getBannerLoading = true;
        break;
      case GET_BANNER_SUCCESS:
        draft.getBannerDone = true;
        draft.getBannerList = action.data;
        draft.getUserLoading = false;
        break;
      case GET_BANNER_FAIL:
        draft.getBannerLoading = false;
        draft.getBannerFail = true;
        draft.adminError = action.error ?? 'error';
        break;
      case GET_BANNER_DONE:
        draft.getBannerFail = false;
        draft.getUserDone = false;
        draft.getBannerList = false;
        draft.adminError = null;
        break;
      default:
        break;
    }
  });

export default reducer;
