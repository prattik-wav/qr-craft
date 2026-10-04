import { useState, useEffect } from 'react';

/**
 * Like useState but persists to localStorage.
 * Falls back to the initial value if localStorage is empty or parsing fails.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (err) {
      console.warn(`Couldn't read "${key}" from localStorage:`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(stored));
    } catch (err) {
      console.warn(`Couldn't write "${key}" to localStorage:`, err);
    }
  }, [key, stored]);

  return [stored, setStored] as const;
}
