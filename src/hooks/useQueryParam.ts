import { useState, useEffect, useCallback } from 'react';

export function useQueryParam<T extends string>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get(key) as T) || defaultValue;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }, [value, key]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlValue = params.get(key) as T;
      if (urlValue) {
        setValue(urlValue);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [key]);

  const updateValue = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  return [value, updateValue];
} 