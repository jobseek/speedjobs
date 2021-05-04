import produce from 'immer';

export const initialState = {
  alertMessage: '',
  pop: false,
  popEnter: false,
  popDone: false,
  timeOut: 0,
  error: null,
};
export const POP_ALERT_REQUEST = 'POP_ALERT_REQUEST';
export const POP_ALERT_DONE = 'POP_ALERT_DONE';
export const POP_INIT = 'POP_INIT';

export const ERROR = 'ERROR';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POP_ALERT_REQUEST:
        draft.alertMessage = action.data.message;
        draft.pop = true;
        draft.popEnter = true;
        break;
      case POP_ALERT_DONE:
        draft.alertMessage = action.data.message;
        draft.popDone = true;
        draft.popEnter = false;
        break;
      case POP_INIT:
        draft.popDone = false;
        draft.alertMessage = '';
        draft.pop = false;
        draft.error = null;
        break;
      case ERROR:
        draft.popDone = false;
        draft.popEnter = false;
        draft.error = action.error ?? 'error';
        break;
      default:
        break;
    }
  });

export default reducer;
