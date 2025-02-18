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

import type { AppState, Data } from './types';

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

  const saveFormData = async (data: Data) => {
    try {
      await simulateDelay();
      simulateError('saving data');

      if (data) {
        setStorageData<Data>(data);
      }

      updateData({ data, saving: false, errorSaving: null });
    } catch (error) {
      console.error('Error saving data:', error);
      updateData({ data: [], saving: false, errorSaving: 'Error saving data' });
    }
  };

  const value: AppContextProps = {
    state,
    saveFormData,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await simulateDelay();
        simulateError('fetching data');

        initializeStorage();
        const data = getStorageData<Data>();

        updateData({ data, fetching: false });
      } catch (error) {
        updateData({ data: [], fetching: false, errorFetching: 'There was an error fetching the data' });
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
}
