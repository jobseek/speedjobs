import produce from 'immer';

export const initialState = {
  tagGetLoading: false,
  tagGetDone: false,
  tagGetData: null,
  tagGetError: null,
};

export const TAG_GET_REQUEST = 'TAG_GET_REQUEST';
export const TAG_GET_SUCCESS = 'TAG_GET_SUCCESS';
export const TAG_GET_FAIL = 'TAG_GET_FAIL';
export const TAG_GET_DONE = 'TAG_GET_DONE';
export const TAG_ERROR_RESOLVED = 'TAG_ERROR_RESOLVED';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TAG_GET_REQUEST:
        draft.tagGetLoading = true;
        draft.tagGetDone = false;
        draft.tagGetData = null;
        draft.tagGetError = null;
        break;
      case TAG_GET_SUCCESS:
        draft.tagGetLoading = false;
        draft.tagGetDone = true;
        draft.tagGetData = action.data;
        break;
      case TAG_GET_FAIL:
        draft.tagGetLoading = false;
        draft.tagGetError = action.error;
        break;
      case TAG_GET_DONE:
        draft.tagGetDone = false;
        break;
      case TAG_ERROR_RESOLVED:
        draft.tagGetError = null;
        break;
      default:
        break;
    }
  });

export default reducer;
