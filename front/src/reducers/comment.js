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

  commentModifyLoading: false,
  commentModifyDone: false,
  commentModifyData: null,
  commentModifyError: null,

  commentFavLoading: false,
  commentFavDone: false,
  commentFavData: null,
  commentFavError: null,

  commentHateLoading: false,
  commentHateDone: false,
  commentHateData: null,
  commentHateError: null,
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

export const COMMENT_MODIFY_REQUEST = 'COMMENT_MODIFY_REQUEST';
export const COMMENT_MODIFY_SUCCESS = 'COMMENT_MODIFY_SUCCESS';
export const COMMENT_MODIFY_FAIL = 'COMMENT_MODIFY_FAIL';

export const COMMENT_FAV_REQUEST = 'COMMENT_FAV_REQUEST';
export const COMMENT_FAV_SUCCESS = 'COMMENT_FAV_SUCCESS';
export const COMMENT_FAV_FAIL = 'COMMENT_FAV_FAIL';
export const COMMENT_FAV_DONE = 'COMMENT_FAV_DONE';

export const COMMENT_HATE_REQUEST = 'COMMENT_HATE_REQUEST';
export const COMMENT_HATE_SUCCESS = 'COMMENT_HATE_SUCCESS';
export const COMMENT_HATE_FAIL = 'COMMENT_HATE_FAIL';
export const COMMENT_HATE_DONE = 'COMMENT_HATE_DONE';

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
        draft.commentAddData = null;
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

      case COMMENT_MODIFY_REQUEST:
        draft.commentModifyLoading = true;
        draft.commentModifyDone = false;
        draft.commentModifyData = null;
        draft.commentModifyError = null;
        break;
      case COMMENT_MODIFY_SUCCESS:
        draft.commentModifyLoading = false;
        draft.commentModifyDone = true;
        draft.commentModifyData = action.data;
        break;
      case COMMENT_MODIFY_FAIL:
        draft.commentModifyLoading = false;
        draft.commentModifyError = action.error;
        break;

      case COMMENT_FAV_REQUEST:
        draft.commentFavLoading = true;
        draft.commentFavDone = false;
        draft.commentFavData = action.data;
        draft.commentFavError = null;
        break;
      case COMMENT_FAV_SUCCESS:
        draft.commentFavLoading = false;
        draft.commentFavDone = true;
        break;
      case COMMENT_FAV_FAIL:
        draft.commentFavLoading = false;
        draft.commentFavError = action.error;
        draft.commentFavData = null;
        break;

      case COMMENT_HATE_REQUEST:
        draft.commentHateLoading = true;
        draft.commentHateDone = false;
        draft.commentHateData = action.data;
        draft.commentHateError = null;
        break;
      case COMMENT_HATE_SUCCESS:
        draft.commentHateLoading = false;
        draft.commentHateDone = true;
        break;
      case COMMENT_HATE_FAIL:
        draft.commentHateLoading = false;
        draft.commentHateError = action.error;
        draft.commentHateData = null;
        break;
      case COMMENT_HATE_DONE:
        draft.commentHateError = null;
        draft.commentHateDone = false;
        draft.commentFavDone = false;
        draft.commentFavError = null;
        draft.commentFavData = null;
        draft.commentHateData = null;
        break;

      case COMMENT_GET_DONE:
        draft.commentAddDone = false;
        draft.commentAddData = null;
        draft.commentGetDone = false;
        draft.commentGetData = null;
        draft.commentDeleteDone = false;
        draft.commentDeleteData = null;
        draft.commentModifyDone = false;
        draft.commentModifyData = null;
        draft.commentFavDone = false;
        draft.commentFavData = null;
        draft.commentHateDone = false;
        draft.commentHateData = null;
        break;

      case COMMENT_ERROR_RESOLVED:
        draft.commentAddError = null;
        draft.commentGetError = null;
        draft.commentDeleteError = null;
        draft.commentModifyError = null;
        draft.commentFavError = null;
        break;
      default:
        break;
    }
  });

export default reducer;
