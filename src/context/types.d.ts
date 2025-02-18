import { FormData } from "@/types/form";

export interface AppState {
  formData: FormData[];
  fetching: boolean;
  saving: boolean;
  errorFetching: string | null;
  errorSaving: string | null;
}