import produce from 'immer';

export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  logInWelcomed: false,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  me: null,
  meDone: false,
  meError: null,
  needLogin: false,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_IN_WELCOMED = 'LOG_IN_WELCOMED';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const LOG_OUT_DONE = 'LOG_OUT_DONE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_UP_DONE = 'SIGN_UP_DONE';

export const ME_REQUEST = 'ME_REQUEST';
export const ME_SUCCESS = 'ME_SUCCESS';
export const ME_FAILURE = 'ME_FAILURE';

export const ERROR_RESOLVED = 'ERROR_RESOLVED';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ME_REQUEST:
        break;
      case ME_SUCCESS:
        draft.meDone = true;
        draft.me = action.data;
        break;
      case ME_FAILURE:
        draft.meError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        draft.logOutDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.me = action.data;
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.needLogin = false;
        break;
      case LOG_IN_WELCOMED:
        draft.logInWelcomed = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logInDone = false;
        draft.logInWelcomed = false;
        draft.me = null;
        draft.meDone = false;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case LOG_OUT_DONE:
        draft.logOutError = null;
        draft.logOutDone = false;
        draft.needLogin = true;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case SIGN_UP_DONE:
        draft.signUpDone = false;
        break;
      case ERROR_RESOLVED:
        draft.signUpError = null;
        draft.logInError = null;
        break;
      default:
        break;
    }
  });

export default reducer;
