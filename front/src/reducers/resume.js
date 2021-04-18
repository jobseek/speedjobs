import produce from 'immer';

export const initialState = {
  resumeAddLoading: false,
  resumeAddError: null,
  resumeAddDone: false,
  resumeAdd: null,
  resumeGetLoading: false,
  resumeGetError: null,
  resumeGetDone: false,
  resumeGet: null,
  resumeUpdateLoading: false,
  resumeUpdateError: null,
  resumeUpdateDone: false,
  resumeUpdate: null,
  resumeDeleteLoading: false,
  resumeDeleteError: null,
  resumeDeleteDone: false,
  resumeDelete: null,
};

export const RESUME_ADD_REQUEST = 'RESUME_ADD_REQUEST';
export const RESUME_ADD_SUCCESS = 'RESUME_ADD_SUCCESS';
export const RESUME_ADD_FAIL = 'RESUME_ADD_FAIL';
export const RESUME_ADD_DONE = 'RESUME_ADD_DONE';

export const RESUME_GET_REQUEST = 'RESUME_GET_REQUEST';
export const RESUME_GET_SUCCESS = 'RESUME_GET_SUCCESS';
export const RESUME_GET_FAIL = 'RESUME_GET_FAIL';
export const RESUME_GET_DONE = 'RESUME_GET_DONE';

export const RESUME_UPDATE_REQUEST = 'RESUME_UPDATE_REQUEST';
export const RESUME_UPDATE_SUCCESS = 'RESUME_UPDATE_SUCCESS';
export const RESUME_UPDATE_FAIL = 'RESUME_UPDATE_FAIL';
export const RESUME_UPDATE_DONE = 'RESUME_UPDATE_DONE';

export const RESUME_DELETE_REQUEST = 'RESUME_DELETE_REQUEST';
export const RESUME_DELETE_SUCCESS = 'RESUME_DELETE_SUCCESS';
export const RESUME_DELETE_FAIL = 'RESUME_DELETE_FAIL';
export const RESUME_DELETE_DONE = 'RESUME_DELETE_DONE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RESUME_ADD_REQUEST:
        draft.resumeAddLoading = true;
        draft.resumeAddError = null;
        draft.resumeAddDone = false;
        draft.resumeAdd = null;
        break;
      case RESUME_ADD_SUCCESS:
        draft.resumeAddLoading = false;
        draft.resumeAddDone = true;
        draft.resumeAdd = action.data;
        break;
      case RESUME_ADD_FAIL:
        draft.resumeAddLoading = false;
        draft.resumeAddError = action.error;
        break;
      case RESUME_ADD_DONE:
        draft.resumeAddLoading = false;
        draft.resumeAddError = null;
        draft.resumeAddDone = false;
        draft.resumeAdd = null;
        break;
      case RESUME_GET_REQUEST:
        draft.resumeGetLoading = true;
        draft.resumeGetError = null;
        draft.resumeGetDone = false;
        draft.resumeGet = null;
        break;
      case RESUME_GET_SUCCESS:
        draft.resumeGetLoading = false;
        draft.resumeGetDone = true;
        draft.resumeGet = action.data;
        break;
      default:
        break;
    }
  });
