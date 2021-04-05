import produce from 'immer';

export const initialState = {
  postGetLoading: false,
  postGetDone: false,
  postGetError: null,
  commentGetLoading: false,
  commentGetDone: false,
  commentGetError: null,
  post: null,
  comment: null,
};

export const POST_GET_REQUEST = 'POST_GET_REQUEST';
export const POST_GET_SUCCESS = 'POST_GET_SUCCESS';
export const POST_GET_FAIL = 'POST_GET_FAIL';
export const POST_GET_DONE = 'POST_GET_DONE';

export const COMMENT_GET_SUCCESS = 'COMMENT_GET_SUCCESS';
export const COMMENT_GET_FAIL = 'COMMENT_GET_FAIL';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POST_GET_REQUEST:
        draft.postGetLoading = true;
        draft.postGetDone = false;
        draft.postGetError = null;
        draft.commentGetLoading = true;
        draft.commentGetDone = false;
        draft.commentGetError = null;
        draft.post = null;
        draft.comment = null;
        break;
      case POST_GET_SUCCESS:
        draft.postGetLoading = false;
        draft.postGetDone = true;
        draft.post = action.data;
        break;
      case POST_GET_FAIL:
        draft.postGetLoading = false;
        draft.postGetError = action.error;
        break;
      case COMMENT_GET_SUCCESS:
        draft.commentGetDone = true;
        draft.comment = action.comment;
        break;
      case COMMENT_GET_FAIL:
        draft.commentGetError = action.error;
        draft.commentGetLoading = false;
        break;
      case POST_GET_DONE:
        draft.postGetDone = false;
        draft.postGetError = null;
        draft.commentGetDone = false;
        draft.commentGetError = null;
        break;
      default:
        break;
    }
  });

export default reducer;
