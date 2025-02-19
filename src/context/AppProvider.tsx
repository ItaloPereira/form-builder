import { useEffect, useReducer, type ReactNode } from 'react';
import { appReducer, initialState } from './appReducer';
import { UPDATE_DATA } from './actionTypes';
import { AppContext, type AppContextProps } from './useAppContext';
import { 
  simulateDelay,
  simulateError,
  getStorageData,
  setStorageData,
  initializeStorage
} from '@/utils/storage';

import type { AppState } from './types';
import type { FormData } from '@/types/form';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
  });

  const updateData = (data: Partial<AppState>) => {
    dispatch({
      type: UPDATE_DATA,
      payload: data,
    });
  };

  const saveFormData = async (data: FormData[]) => {
    updateData({ saving: true, saved: false, errorSaving: undefined });

    try {
      await simulateDelay();
      simulateError('saving data');

      if (data) {
        setStorageData<FormData[]>(data);
      }

      updateData({ formData: data, saving: false, saved: true, errorSaving: undefined });
    } catch (error) {
      console.error('Error saving data:', error);
      updateData({ formData: [], saving: false, saved: false, errorSaving: 'Error saving data' });
    }
  };

  const value: AppContextProps = {
    state,
    saveFormData,
    updateData,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await simulateDelay();
        simulateError('fetching data');

        initializeStorage();
        const formData = getStorageData<FormData[]>();

        updateData({ formData, fetching: false });
      } catch (error) {
        updateData({ formData: [], fetching: false, errorFetching: 'There was an error fetching the data' });
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
}
