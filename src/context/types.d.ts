export type Data = string[];

export interface AppState {
  data: Data;
  fetching: boolean;
  saving: boolean;
  errorFetching: string | null;
  errorSaving: string | null;
}