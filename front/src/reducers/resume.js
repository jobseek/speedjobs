import produce from 'immer';

export const initialState = {
  resumeGetLoading: false,
  resumeGetDone: false,
  resumeGetError: null,
  resumeGet: null,

  resumeListLoading: false,
  resumeListDone: false,
  resumeListError: null,
  resumeList: null,

  resumeAddLoading: false,
  resumeAddDone: false,
  resumeAddError: null,
  resumeAdd: null,

  resumeDeleteLoading: false,
  resumeDeleteDone: false,
  resumeDeleteError: null,
  resumeDelete: null,

  resumeModifyLoading: false,
  resumeModifyDone: false,
  resumeModifyError: null,
  resumeModify: null,

  resumeApplyLoading: false,
  resumeApplyDone: false,
  resumeApplyError: null,
  resumeApply: null,
};

export const RESUME_GET_REQUEST = 'RESUME_GET_REQUEST';
export const RESUME_GET_SUCCESS = 'RESUME_GET_SUCCESS';
export const RESUME_GET_FAIL = 'RESUME_GET_FAIL';
export const RESUME_GET_DONE = 'RESUME_GET_DONE';

export const RESUME_ADD_REQUEST = 'RESUME_ADD_REQUEST';
export const RESUME_ADD_SUCCESS = 'RESUME_ADD_SUCCESS';
export const RESUME_ADD_FAIL = 'RESUME_ADD_FAIL';
export const RESUME_ADD_DONE = 'RESUME_ADD_DONE';

export const RESUME_LIST_REQUEST = 'RESUME_LIST_REQUEST';
export const RESUME_LIST_SUCCESS = 'RESUME_LIST_SUCCESS';
export const RESUME_LIST_FAIL = 'RESUME_LIST_FAIL';
export const RESUME_LIST_DONE = 'RESUME_LIST_DONE';

export const RESUME_DELETE_REQUEST = 'RESUME_DELETE_REQUEST';
export const RESUME_DELETE_SUCCESS = 'RESUME_DELETE_SUCCESS';
export const RESUME_DELETE_FAIL = 'RESUME_DELETE_FAIL';
export const RESUME_DELETE_DONE = 'RESUME_DELETE_DONE';

export const RESUME_MODIFY_REQUEST = 'RESUME_MODIFY_REQUEST';
export const RESUME_MODIFY_SUCCESS = 'RESUME_MODIFY_SUCCESS';
export const RESUME_MODIFY_FAIL = 'RESUME_MODIFY_FAIL';
export const RESUME_MODIFY_DONE = 'RESUME_MODIFY_DONE';

export const RESUME_APPLY_REQUEST = 'RESUME_APPLY_REQUEST';
export const RESUME_APPLY_SUCCESS = 'RESUME_APPLY_SUCCESS';
export const RESUME_APPLY_FAIL = 'RESUME_APPLY_FAIL';
export const RESUME_APPLY_DONE = 'RESUME_APPLY_DONE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // =========GET=========
      case RESUME_GET_REQUEST:
        draft.resumeGetLoading = true;
        draft.resumeGetDone = false;
        draft.resumeGetError = null;
        draft.resumeGet = null;
        break;
      case RESUME_GET_SUCCESS:
        draft.resumeGetLoading = false;
        draft.resumeGetDone = true;
        draft.resumeGet = action.data;
        break;
      case RESUME_GET_FAIL:
        draft.resumeGetLoading = false;
        draft.resumeGetError = action.error;
        break;
      case RESUME_GET_DONE:
        draft.resumeGetDone = false;
        draft.resumeGetError = null;
        draft.resumeGet = null;
        break;

      // =========LIST=========
      case RESUME_LIST_DONE:
        draft.resumeListDone = false;
        draft.resumeListLoading = false;
        draft.resumeList = null;
        break;
      case RESUME_LIST_REQUEST:
        draft.resumeListLoading = true;
        draft.resumeListError = null;
        draft.resumeListDone = false;
        break;
      case RESUME_LIST_FAIL:
        draft.resumeListLoading = false;
        draft.resumeListError = action.error;
        break;
      case RESUME_LIST_SUCCESS:
        draft.resumeListDone = true;
        draft.resumeList = action.data;
        break;

      // =========ADD=========
      case RESUME_ADD_REQUEST:
        draft.resumeAddLoading = true;
        draft.resumeAdd = null;
        draft.resumeAddError = null;
        draft.resumeAddDone = false;
        break;
      case RESUME_ADD_SUCCESS:
        draft.resumeAddLoading = false;
        draft.resumeAdd = action.data;
        draft.resumeAddDone = true;
        break;
      case RESUME_ADD_FAIL:
        draft.resumeAddLoading = false;
        draft.resumeAddError = action.error;
        break;
      case RESUME_ADD_DONE:
        draft.resumeAddLoading = false;
        draft.resumeAdd = null;
        draft.resumeAddError = null;
        draft.resumeAddDone = false;
        break;

      // =========DELETE=========
      case RESUME_DELETE_REQUEST:
        draft.resumeDeleteLoading = true;
        draft.resumeDeleteDone = false;
        draft.resumeDeleteError = null;
        draft.resumeDelete = null;
        break;
      case RESUME_DELETE_SUCCESS:
        draft.resumeDeleteLoading = false;
        draft.resumeDeleteDone = true;
        draft.resumeDelete = action.data;
        break;
      case RESUME_DELETE_FAIL:
        draft.resumeDeleteLoading = false;
        draft.resumeDeleteError = action.error;
        break;
      case RESUME_DELETE_DONE:
        draft.resumeDeleteDone = false;
        draft.resumeDeleteError = null;
        draft.resumeDelete = null;
        break;

      // =========MODIFY=========
      case RESUME_MODIFY_REQUEST:
        draft.resumeModifyLoading = true;
        draft.resumeModifyDone = false;
        draft.resumeModifyError = null;
        draft.resumeModify = null;
        break;
      case RESUME_MODIFY_SUCCESS:
        draft.resumeModifyLoading = false;
        draft.resumeModifyDone = true;
        draft.resumeModify = action.data;
        break;
      case RESUME_MODIFY_FAIL:
        draft.resumeModifyLoading = false;
        draft.resumeModifyError = action.error;
        break;
      case RESUME_MODIFY_DONE:
        draft.resumeModifyDone = false;
        draft.resumeModify = null;
        draft.resumeModifyError = null;
        break;

      // =========APPLY=========
      case RESUME_APPLY_REQUEST:
        draft.resumeApplyLoading = true;
        draft.resumeApplyDone = false;
        draft.resumeApplyError = null;
        draft.resumeApply = null;
        break;
      case RESUME_APPLY_SUCCESS:
        draft.resumeApplyLoading = false;
        draft.resumeApplyDone = true;
        draft.resumeApply = action.data;
        break;
      case RESUME_APPLY_FAIL:
        draft.resumeApplyLoading = false;
        draft.resumeAddError = action.error;
        break;
      case RESUME_APPLY_DONE:
        draft.resumeApplyDone = false;
        draft.resumeApply = null;
        break;

      default:
        break;
    }
  });

export default reducer;
