import produce from 'immer';

export const initialState = {
  profileGetLoading: false,
  profileGetDone: false,
  profileGetError: null,
  profileGetData: null,
  profileUpdateLoading: false,
  profileUpdateDone: false,
  profileUpdateError: null,
  profileUpdate: null,
  profileDeleteLoading: false,
  profileDeleteDone: false,
  profileDeleteError: null,
  profileDelete: null,
};

export const PROFILE_GET_REQUEST = 'PROFILE_GET_REQUEST';
export const PROFILE_GET_SUCCESS = 'PROFILE_GET_SUCCESS';
export const PROFILE_GET_FAIL = 'PROFILE_GET_FAIL';
export const PROFILE_GET_DONE = 'PROFILE_GET_DONE';
export const PROFILE_ERROR_RESOLVED = 'PROFILE_ERROR_RESOLVED';

export const PROFILE_UPDATE_REQUEST = 'PROFILE_UPDATE_REQUEST';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAIL = 'PROFILE_UPDATE_FAIL';
export const PROFILE_UPDATE_DONE = 'PROFILE_UPDATE_DONE';

export const PROFILE_DELETE_REQUEST = 'PROFILE_DELETE_REQUEST';
export const PROFILE_DELETE_SUCCESS = 'PROFILE_DELETE_SUCCESS';
export const PROFILE_DELETE_FAIL = 'PROFILE_DELETE_FAIL';
export const PROFILE_DELETE_DONE = 'PROFILE_DELETE_DONE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PROFILE_GET_REQUEST:
        draft.profileGetLoading = true;
        draft.profileGetDone = false;
        draft.profileGetError = null;
        draft.profileGetData = null;
        break;
      case PROFILE_GET_SUCCESS:
        draft.profileGetLoading = false;
        draft.profileGetDone = true;
        draft.profileGetData = action.data;
        break;
      case PROFILE_GET_FAIL:
        draft.profileGetLoading = false;
        draft.profileGetError = action.error;
        break;
      case PROFILE_GET_DONE:
        draft.profileGetDone = false;
        draft.profileGetData = null;
        break;
      case PROFILE_ERROR_RESOLVED:
        draft.profileGetError = null;
        break;
      case PROFILE_UPDATE_REQUEST:
        draft.profileUpdateLoading = true;
        draft.profileUpdate = null;
        draft.profileUpdateError = null;
        draft.profileUpdateDone = false;
        break;
      case PROFILE_UPDATE_SUCCESS:
        draft.profileUpdateLoading = false;
        draft.profileUpdate = action.data;
        draft.profileUpdateDone = true;
        break;
      case PROFILE_UPDATE_FAIL:
        draft.profileUpdateLoading = false;
        draft.profileUpdateError = action.error;
        break;
      case PROFILE_UPDATE_DONE:
        draft.profileUpdateLoading = false;
        draft.profileUpdate = null;
        draft.profileUpdateError = null;
        draft.profileUpdateDone = false;
        break;
      case PROFILE_DELETE_REQUEST:
        draft.profileDeleteLoading = true;
        draft.profileDelete = null;
        draft.profileDeleteError = null;
        draft.profileDeleteDone = false;
        break;
      case PROFILE_DELETE_SUCCESS:
        draft.profileDeleteLoading = false;
        draft.profileDelete = action.data;
        draft.profileDeleteDone = true;
        break;
      case PROFILE_DELETE_FAIL:
        draft.profileDeleteLoading = false;
        draft.profileDeleteError = action.error;
        break;
      case PROFILE_DELETE_DONE:
        draft.profileDeleteLoading = false;
        draft.profileDelete = null;
        draft.profileDeleteError = null;
        draft.profileDeleteDone = false;
        break;
      default:
        break;
    }
  });

export default reducer;
