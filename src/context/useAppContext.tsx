import { createContext, useContext } from 'react';
import type { AppState, Data } from './types';

export interface AppContextProps {
  state: AppState;
  saveFormData: (data: Data) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
} 