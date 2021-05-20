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

  recruitModifyLoading: false,
  recruitModifyDone: false,
  recruitModifyError: null,
  recruitModify: null,

  recruitDeleteLoading: false,
  recruitDeleteDone: false,
  recruitDeleteError: null,
  recruitDelete: null,

  getChatLoading: false,
  getChatDone: false,
  getChatFail: false,
  getChatError: null,
  chat: null,
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

export const RECRUIT_MODIFY_REQUEST = 'RECRUIT_MODIFY_REQUEST';
export const RECRUIT_MODIFY_SUCCESS = 'RECRUIT_MODIFY_SUCCESS';
export const RECRUIT_MODIFY_FAIL = 'RECRUIT_MODIFY_FAIL';
export const RECRUIT_MODIFY_DONE = 'RECRUIT_MODIFY_DONE';

export const RECRUIT_DELETE_REQUEST = 'RECRUIT_DELETE_REQUEST';
export const RECRUIT_DELETE_SUCCESS = 'RECRUIT_DELETE_SUCCESS';
export const RECRUIT_DELETE_FAIL = 'RECRUIT_DELETE_FAIL';
export const RECRUIT_DELETE_DONE = 'RECRUIT_DELETE_DONE';

export const GET_CHAT_REQUEST = 'GET_CHAT_REQUEST';
export const GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
export const GET_CHAT_DONE = 'GET_CHAT_DONE';
export const GET_CHAT_FAIL = 'GET_CHAT_FAIL';

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

      case RECRUIT_MODIFY_REQUEST:
        draft.recruitModifyLoading = true;
        draft.recruitModifyDone = false;
        draft.recruitModifyError = null;
        draft.recruitModify = null;
        break;
      case RECRUIT_MODIFY_SUCCESS:
        draft.recruitModifyLoading = false;
        draft.recruitModifyDone = true;
        draft.recruitModify = action.data;
        break;
      case RECRUIT_MODIFY_FAIL:
        draft.recruitModifyLoading = false;
        draft.recruitModifyError = action.error;
        break;
      case RECRUIT_MODIFY_DONE:
        draft.recruitModifyDone = false;
        draft.recruitModify = null;
        draft.recruitModifyError = null;
        break;

      case RECRUIT_DELETE_REQUEST:
        draft.recruitDeleteLoading = true;
        draft.recruitDeleteDone = false;
        draft.recruitDelete = null;
        draft.recruitDeleteError = null;
        break;
      case RECRUIT_DELETE_SUCCESS:
        draft.recruitDeleteLoading = false;
        draft.recruitDeleteDone = true;
        draft.recruitDelete = action.data;
        break;
      case RECRUIT_DELETE_FAIL:
        draft.recruitDeleteLoading = false;
        draft.recruitDeleteError = action.error;
        break;
      case RECRUIT_DELETE_DONE:
        draft.recruitDeleteDone = false;
        draft.recruitDelete = null;
        draft.recruitDeleteError = null;
        break;

      case GET_CHAT_REQUEST:
        draft.getChatLoading = true;
        break;
      case GET_CHAT_SUCCESS:
        draft.getChatDone = true;
        draft.chat = action.data;
        draft.getChatLoading = false;
        break;
      case GET_CHAT_FAIL:
        draft.getChatFail = true;
        draft.getChatError = action.error;
        draft.getChatLoading = false;
        break;
      case GET_CHAT_DONE:
        draft.getChatDone = false;
        draft.chat = null;
        draft.getChatError = null;
        break;
      default:
        break;
    }
  });

export default reducer;
