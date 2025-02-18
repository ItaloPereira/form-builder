import { SAVE_FORM_DATA, UPDATE_DATA } from './actionTypes';

import type { AppState } from './types';
import type { FormData } from '@/types/form';

interface SaveDataAction {
  type: typeof SAVE_FORM_DATA;
  payload: FormData[];
};

interface UpdateDataAction {
  type: typeof UPDATE_DATA;
  payload: Partial<AppState>;
};

type AppActions = SaveDataAction | UpdateDataAction;

export const initialState: AppState = {
  formData: [],
  fetching: true,
  saving: false,
  errorFetching: undefined,
  errorSaving: undefined,
  saved: false,
};

export function appReducer(
  state: AppState,
  action: AppActions
): AppState {
  switch (action.type) {
    case SAVE_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    case UPDATE_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
