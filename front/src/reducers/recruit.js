import produce from 'immer';

export const initialState = {
  recruitGetLoading: false,
  recruitGetDone: false,
  recruitGetError: null,
  recruit: null,
  recruitListLoading: false,
  recruitListDone: false,
  recruitListError: null,
  recruitList: null,
  recruitListSearchBar: false,
  recruitAddLoading: false,
  recruitAddDone: false,
  recruitAddError: null,
  recruitAdd: null,
};

export const RECRUIT_GET_REQUEST = 'RECRUIT_GET_REQUEST';
export const RECRUIT_GET_SUCCESS = 'RECRUIT_GET_SUCCESS';
export const RECRUIT_GET_FAIL = 'RECRUIT_GET_FAIL';
export const RECRUIT_GET_DONE = 'RECRUIT_GET_DONE';

export const RECRUIT_LIST_REQUEST = 'RECRUIT_LIST_REQUEST';
export const RECRUIT_LIST_SUCCESS = 'RECRUIT_LIST_SUCCESS';
export const RECRUIT_LIST_FAIL = 'RECRUIT_LIST_FAIL';
export const RECRUIT_LIST_DONE = 'RECRUIT_LIST_DONE';
export const RECRUIT_LIST_SEARCHBAR_SUCCESS = 'RECRUIT_LIST_SEARCHBAR_SUCCESS';

export const RECRUIT_ADD_REQUEST = 'RECRUIT_ADD_REQUEST';
export const RECRUIT_ADD_SUCCESS = 'RECRUIT_ADD_SUCCESS';
export const RECRUIT_ADD_FAIL = 'RECRUIT_ADD_FAIL';
export const RECRUIT_ADD_DONE = 'RECRUIT_ADD_DONE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RECRUIT_GET_REQUEST:
        draft.recruitGetLoading = true;
        draft.recruitGetDone = false;
        draft.recruitGetError = null;
        draft.recruit = null;
        break;
      case RECRUIT_GET_SUCCESS:
        draft.recruitGetLoading = false;
        draft.recruitGetDone = true;
        draft.recruit = action.data;
        break;
      case RECRUIT_GET_FAIL:
        draft.recruitGetLoading = false;
        draft.recruitGetError = action.error;
        break;
      case RECRUIT_GET_DONE:
        draft.recruitGetDone = false;
        draft.recruitGetError = null;
        break;
      case RECRUIT_LIST_REQUEST:
        draft.recruitListLoading = true;
        draft.recruitListError = null;
        draft.recruitListDone = false;
        break;
      case RECRUIT_LIST_SUCCESS:
        draft.recruitListDone = true;
        draft.recruitList = action.data;
        break;
      case RECRUIT_LIST_SEARCHBAR_SUCCESS:
        draft.recruitListSearchBar = true;
        draft.recruitList = action.data;
        break;
      case RECRUIT_LIST_FAIL:
        draft.recruitListLoading = false;
        draft.recruitListError = action.error;
        break;
      case RECRUIT_LIST_DONE:
        draft.recruitListDone = false;
        draft.recruitListLoading = false;
        draft.recruitList = null;
        draft.recruitListSearchBar = false;
        break;
      case RECRUIT_ADD_REQUEST:
        draft.recruitAddLoading = true;
        draft.recruitAdd = null;
        draft.recruitAddError = null;
        draft.recruitAddDone = false;
        break;
      case RECRUIT_ADD_SUCCESS:
        draft.recruitAddLoading = false;
        draft.recruitAdd = action.data;
        draft.recruitAddDone = true;
        break;
      case RECRUIT_ADD_FAIL:
        draft.recruitAddLoading = false;
        draft.recruitAddError = action.error;
        break;
      case RECRUIT_ADD_DONE:
        draft.recruitAddLoading = false;
        draft.recruitAdd = null;
        draft.recruitAddError = null;
        draft.recruitAddDone = false;
        break;
      default:
        break;
    }
  });

export default reducer;
