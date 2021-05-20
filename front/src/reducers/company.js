import produce from 'immer';

export const initialState = {
  companyGetLoading: false,
  companyGetDone: false,
  companyGetData: null,
  companyGetError: null,

  applyListLoading: false,
  applyListDone: false,
  applyListData: null,
  applyListError: null,
  applyListId: -1,
};

export const COMPANY_GET_REQUEST = 'COMPANY_GET_REQUEST';
export const COMPANY_GET_SUCCESS = 'COMPANY_GET_SUCCESS';
export const COMPANY_GET_DONE = 'COMPANY_GET_DONE';
export const COMPANY_GET_FAIL = 'COMPANY_GET_FAIL';
export const COMPANY_ERROR_RESOLVED = 'COMPANY_ERROR_RESOLVED';

export const APPLY_LIST_REQUEST = 'APPLY_LIST_REQUEST';
export const APPLY_LIST_SUCCESS = 'APPLY_LIST_SUCCESS';
export const APPLY_LIST_DONE = 'APPLY_LIST_DONE';
export const APPLY_LIST_FAIL = 'APPLY_LIST_FAIL';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case COMPANY_GET_REQUEST:
        draft.companyGetLoading = true;
        draft.companyGetDone = false;
        draft.companyGetData = null;
        draft.companyGetError = null;
        break;
      case COMPANY_GET_SUCCESS:
        draft.companyGetLoading = false;
        draft.companyGetDone = true;
        draft.companyGetData = action.data;
        break;
      case COMPANY_GET_DONE:
        draft.companyGetDone = false;
        draft.companyGetData = null;
        break;
      case COMPANY_GET_FAIL:
        draft.companyGetLoading = false;
        draft.companyGetError = action.error;
        break;

      case APPLY_LIST_REQUEST:
        draft.applyListLoading = true;
        draft.applyListDone = false;
        draft.applyListData = null;
        draft.applyListError = null;
        break;
      case APPLY_LIST_SUCCESS:
        draft.applyListLoading = false;
        draft.applyListDone = true;
        draft.applyListData = action.data;
        draft.applyListId = action.id;
        break;
      case APPLY_LIST_FAIL:
        draft.applyListLoading = false;
        draft.applyListError = action.error;
        break;
      case APPLY_LIST_DONE:
        draft.applyListDone = false;
        draft.applyListData = null;
        break;

      case COMPANY_ERROR_RESOLVED:
        draft.companyGetError = null;
        break;
      default:
        break;
    }
  });
export default reducer;
