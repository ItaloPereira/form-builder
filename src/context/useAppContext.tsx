import { createContext, useContext } from 'react';
import type { AppState } from './types';
import type { FormData } from '@/types/form';

export interface AppContextProps {
  state: AppState;
  saveFormData: (formData: FormData[]) => void;
  updateData: (state: Partial<AppState>) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
} 