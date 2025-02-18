const APP_DATA_KEY = 'APP_DATA';
const ERROR_CHANCE = 0.05; // 5% chance of error
const MIN_DELAY = 1000;
const MAX_DELAY = 2000;

export const simulateDelay = async () => {
  const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY)) + MIN_DELAY;
  await new Promise((resolve) => setTimeout(resolve, delay));
};

export const simulateError = (operation: string) => {
  if (Math.random() < ERROR_CHANCE) {
    throw new Error(`Random error occurred while ${operation}`);
  }
};

export const getStorageData = <T>(): T => {
  try {
    const data = localStorage.getItem(APP_DATA_KEY);
    return data ? (JSON.parse(data) as T) : [] as T;
  } catch {
    return [] as T;
  }
};

export const setStorageData = <T>(data: T): void => {
  localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
};

export const initializeStorage = (): void => {
  if (!localStorage.getItem(APP_DATA_KEY)) {
    setStorageData([]);
  }
}; 