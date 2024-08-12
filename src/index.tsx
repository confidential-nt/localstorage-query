import { useEffect, useState } from 'react';

export default function useLocalstorageQuery<T = undefined>(
  key: string,
  initialValue?: T | null
) {
  const [data, setData] = useState<T | null>();

  const stringifiedInitialValue =
    initialValue !== undefined ? JSON.stringify(initialValue) : 'undefined';

  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      const parsed = JSON.parse(value);
      setData(parsed);
      return;
    }

    if (stringifiedInitialValue !== 'undefined') {
      localStorage.setItem(key, stringifiedInitialValue);
      setData(JSON.parse(stringifiedInitialValue));
      return;
    }

    localStorage.setItem(key, 'undefined');
  }, [key, stringifiedInitialValue]);

  const mutate = (newValue: T) => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      localStorage.setItem(key, JSON.stringify(newValue));
      setData(newValue);
    }
  };

  const remove = () => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      localStorage.removeItem(key);
      setData(null);
    }
  };

  return {
    data,
    mutate,
    remove,
  };
}
