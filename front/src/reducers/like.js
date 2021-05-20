import produce from 'immer';

export const initialState = {
  addLikeLoading: false,
  addLikeDone: false,
  addLikeFail: false,
  data: null,
  error: null,
  unLikeLoading: false,
  unLikeDone: false,
  unLikeFail: false,
  getLikeLoading: false,
  getLikeDone: false,
  getLikeFail: false,
  list: null,
};

export const ADD_LIKE_REQUEST = 'ADD_LIKE_REQUEST';
export const ADD_LIKE_SUCCESS = 'ADD_LIKE_SUCCESS';
export const ADD_LIKE_DONE = 'ADD_LIKE_DONE';
export const ADD_LIKE_FAIL = 'ADD_LIKE_FAIL';
export const UN_LIKE_REQUEST = 'UN_LIKE_REQUEST';
export const UN_LIKE_SUCCESS = 'UN_LIKE_SUCCESS';
export const UN_LIKE_DONE = 'UN_LIKE_DONE';
export const UN_LIKE_FAIL = 'UN_LIKE_FAIL';

export const GET_LIKE_REQUEST = 'GET_LIKE_REQUEST';
export const GET_LIKE_SUCCESS = 'GET_LIKE_SUCCESS';
export const GET_LIKE_DONE = 'GET_LIKE_DONE';
export const GET_LIKE_FAIL = 'GET_LIKE_FAIL';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_LIKE_REQUEST:
        draft.addLikeLoading = true;
        draft.data = action.data;
        break;
      case ADD_LIKE_FAIL:
        draft.addLikeLoading = false;
        draft.addLikeFail = true;
        draft.error = action.error ?? 'error';
        break;
      case ADD_LIKE_SUCCESS:
        draft.addLikeLoading = false;
        draft.addLikeDone = true;
        break;
      case ADD_LIKE_DONE:
        draft.addLikeDone = false;
        draft.unLikeDone = false;
        break;
      case UN_LIKE_REQUEST:
        draft.unLikeLoading = true;
        draft.data = action.data;
        break;
      case UN_LIKE_FAIL:
        draft.unLoading = false;
        draft.unLikeFail = true;
        draft.error = action.error ?? 'error';
        break;
      case UN_LIKE_SUCCESS:
        draft.unLikeLoading = false;
        draft.unLikeDone = true;
        break;
      case UN_LIKE_DONE:
        draft.unLikeDone = false;
        draft.addLikeDone = false;
        break;
      case GET_LIKE_REQUEST:
        draft.getLikeLoading = true;
        draft.data = action.data;
        break;
      case GET_LIKE_FAIL:
        draft.getLikeFail = true;
        draft.getLikeLoading = false;
        draft.error = action.error ?? 'error';
        break;
      case GET_LIKE_SUCCESS:
        draft.getLikeLoading = false;
        draft.getLikeDone = true;
        draft.list = action.data;
        break;
      case GET_LIKE_DONE:
        draft.getLikeDone = false;
        draft.list = null;
        break;
      default:
        break;
    }
  });

export default reducer;
