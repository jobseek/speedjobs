import produce from 'immer';

export const initialState = {
  commentAddLoading: false,
  commentAddDone: false,
  commentAddData: null,
  commentAddError: null,

  commentGetLoading: false,
  commentGetDone: false,
  commentGetData: null,
  commentGetError: null,

  commentDeleteLoading: false,
  commentDeleteDone: false,
  commentDeleteData: null,
  commentDeleteError: null,
};

export const COMMENT_ADD_REQUEST = 'COMMENT_ADD_REQUEST';
export const COMMENT_ADD_SUCCESS = 'COMMENT_ADD_SUCCESS';
export const COMMENT_ADD_FAIL = 'COMMENT_ADD_FAIL';
export const COMMENT_ERROR_RESOLVED = 'COMMENT_ERROR_RESOLVED';

export const COMMENT_GET_REQUEST = 'COMMENT_GET_REQUEST';
export const COMMENT_GET_SUCCESS = 'COMMENT_GET_SUCCESS';
export const COMMENT_GET_FAIL = 'COMMENT_GET_FAIL';
export const COMMENT_GET_DONE = 'COMMENT_GET_DONE';

export const COMMENT_DELETE_REQUEST = 'COMMENT_DELETE_REQUEST';
export const COMMENT_DELETE_SUCCESS = 'COMMENT_DELETE_SUCCESS';
export const COMMENT_DELETE_FAIL = 'COMMENT_DELETE_FAIL';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case COMMENT_ADD_REQUEST:
        draft.commnetAddLoading = true;
        draft.commentAddDone = false;
        draft.commentAddData = null;
        draft.commentAddError = null;
        break;
      case COMMENT_ADD_SUCCESS:
        draft.commnetAddLoading = false;
        draft.commentAddDone = true;
        draft.commentAddData = action.data;
        break;
      case COMMENT_ADD_FAIL:
        draft.commnetAddLoading = false;
        draft.commentAddError = action.error;
        break;

      case COMMENT_GET_REQUEST:
        draft.commentGetLoading = true;
        draft.commentGetDone = false;
        draft.commentGetData = null;
        draft.commentGetError = null;
        break;
      case COMMENT_GET_SUCCESS:
        draft.commentGetLoading = false;
        draft.commentGetDone = true;
        draft.commentGetData = action.data;
        break;
      case COMMENT_GET_FAIL:
        draft.commentGetLoading = false;
        draft.commentGetError = action.error;
        break;
      case COMMENT_GET_DONE:
        draft.commentAddDone = false;
        draft.commentAddData = null;
        draft.commentGetDone = false;
        draft.commentGetData = null;
        draft.commentDeleteDone = false;
        draft.commentDeleteData = null;
        break;

      case COMMENT_DELETE_REQUEST:
        draft.commentDeleteLoading = true;
        draft.commentDeleteDone = false;
        draft.commentDeleteData = null;
        draft.commentDeleteError = null;
        break;
      case COMMENT_DELETE_SUCCESS:
        draft.commentDeleteLoading = false;
        draft.commentDeleteDone = true;
        draft.commentDeleteData = action.data;
        break;
      case COMMENT_DELETE_FAIL:
        draft.commentDeleteLoading = false;
        draft.commentDeleteError = action.error;
        break;

      case COMMENT_ERROR_RESOLVED:
        draft.commentAddError = null;
        draft.commentGetError = null;
        break;
      default:
        break;
    }
  });

export default reducer;
