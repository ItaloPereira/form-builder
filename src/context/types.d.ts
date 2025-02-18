export type Data = string[];

export interface AppState {
  data: Data;
  isLoading: boolean;
  error: string | null;
}