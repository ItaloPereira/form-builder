import { SAVE_FORM_DATA, UPDATE_DATA } from './actionTypes';

import type { AppState, Data } from './types';

interface SaveDataAction {
  type: typeof SAVE_FORM_DATA;
  payload: Data;
};

interface UpdateDataAction {
  type: typeof UPDATE_DATA;
  payload: Partial<AppState>;
};

type AppActions = SaveDataAction | UpdateDataAction;

export const initialState: AppState = {
  data: [],
  isLoading: true,
  error: null,
};

export function appReducer(
  state: AppState,
  action: AppActions
): AppState {
  switch (action.type) {
    case SAVE_FORM_DATA:
      return {
        ...state,
        data: action.payload,
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
