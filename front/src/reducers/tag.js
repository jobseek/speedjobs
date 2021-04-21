import produce from 'immer';

export const initialState = {
  tagGetLoading: false,
  tagGetDone: false,
  tagGetData: null,
  tagGetError: null,
  tagEditLoading: false,
  tagData: null,
  tagEditDone: false,
  tagDeleteLoading: false,
  tagDeleteDone: false,
  error: null,
  tagAddLoading: false,
  tagAddDone: false,
  tagAddFail: false,
};

export const TAG_GET_REQUEST = 'TAG_GET_REQUEST';
export const TAG_GET_SUCCESS = 'TAG_GET_SUCCESS';
export const TAG_GET_FAIL = 'TAG_GET_FAIL';
export const TAG_GET_DONE = 'TAG_GET_DONE';
export const TAG_ERROR_RESOLVED = 'TAG_ERROR_RESOLVED';


export const TAG_EDIT_REQUEST = 'TAG_EDIT_REQUEST';
export const TAG_EDIT_SUCCESS = 'TAG_EDIT_SUCCESS';
export const TAG_EDIT_FAIL = 'TAG_EDIT_FAIL';
export const TAG_EDIT_DONE = 'TAG_EDIT_DONE';

export const TAG_DELETE_REQUEST = 'TAG_DELETE_REQUEST';
export const TAG_DELETE_SUCCESS = 'TAG_DELETE_SUCCESS';
export const TAG_DELETE_FAIL = 'TAG_DELETE_FAIL';
export const TAG_DELETE_DONE = 'TAG_DELETE_DONE';

export const TAG_ADD_REQUEST = 'TAG_ADD_REQUEST';
export const TAG_ADD_SUCCESS = 'TAG_ADD_SUCCESS';
export const TAG_ADD_FAIL = 'TAG_ADD_FAIL';
export const TAG_ADD_DONE = 'TAG_ADD_DONE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TAG_GET_REQUEST:
        draft.tagGetLoading = true;
        draft.tagGetDone = false;
        draft.tagGetData = null;
        draft.tagGetError = null;
        draft.tagAddDone = false;
        draft.tagEditDone = false;
        draft.tagDeleteDone = false;
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
        draft.error = null;
        draft.tag = null;
        break;
      case TAG_EDIT_REQUEST:
        draft.tag = action.data;
        draft.tagEditLoading = true;
        draft.tagEditDone = false;
        break;
      case TAG_EDIT_SUCCESS:
        draft.tagEditLoading = false;
        draft.tagEditDone = true;
        break;
      case TAG_EDIT_DONE:
        draft.tagGetDone = false;
        break;
      case TAG_EDIT_FAIL:
        draft.error = action.error;
        draft.tagEditLoading = false;
        break;
      case TAG_DELETE_REQUEST:
        draft.tag = action.data;
        draft.tagDeleteLoading = true;
        draft.tagDeleteDone = false;
        break;
      case TAG_DELETE_SUCCESS:
        draft.tagDeleteDone = true;
        draft.tagDeleteLoading = false;
        break;
      case TAG_DELETE_DONE:
        draft.tagDeleteDone = false;
        break;
      case TAG_DELETE_FAIL:
        draft.tagDeleteLoading = false;
        draft.error = action.error;
        break;
      case TAG_ADD_REQUEST:
        draft.tagAddLoading = true;
        draft.tag = action.data;
        break;
      case TAG_ADD_FAIL:
        draft.error = action.error;
        draft.tagAddLoading = false;
        break;
      case TAG_ADD_SUCCESS:
        draft.tagAddDone = true;
        break;
      case TAG_ADD_DONE:
        draft.tagAddDone = false;
        draft.tag = null;
        break;
      default:
        break;
    }
  });

export default reducer;
