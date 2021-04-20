import produce from 'immer';

export const initialState = {
  companyGetLoading: false,
  companyGetDone: false,
  companyGetData: null,
  companyGetError: null,
};

export const COMPANY_GET_REQUEST = 'COMPANY_GET_REQUEST';
export const COMPANY_GET_SUCCESS = 'COMPANY_GET_SUCCESS';
export const COMPANY_GET_DONE = 'COMPANY_GET_DONE';
export const COMPANY_GET_FAIL = 'COMPANY_GET_FAIL';
export const COMPANY_ERROR_RESOLVED = 'COMPANY_ERROR_RESOLVED';

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
      case COMPANY_ERROR_RESOLVED:
        draft.companyGetError = null;
        break;
      default:
        break;
    }
  });
export default reducer;
