import { useEffect, useState } from 'react';

export default function useLocalstorageQuery<T = undefined>(
  key: string,
  initialValue?: T | null
) {
  const [data, setData] = useState<T | null>();

  const stringifiedInitialValue =
    initialValue !== undefined
      ? JSON.stringify(initialValue)
      : JSON.stringify('undefined');

  useEffect(() => {
    const value = localStorage.getItem(key);

    const notNullValueAndNotUndefined =
      value !== null && value !== JSON.stringify('undefined');

    if (notNullValueAndNotUndefined) {
      const parsed = JSON.parse(value);
      setData(parsed);
      return;
    }

    const notNullValueButUndefined =
      value !== null && value === JSON.stringify('undefined');

    if (notNullValueButUndefined) {
      return;
    }

    if (stringifiedInitialValue !== JSON.stringify('undefined')) {
      localStorage.setItem(key, stringifiedInitialValue);
      setData(JSON.parse(stringifiedInitialValue));
      return;
    }

    localStorage.setItem(key, JSON.stringify('undefined'));
  }, [key, stringifiedInitialValue]);

  const mutate = (newValue: T) => {
    const value = localStorage.getItem(key);

    const stringifiedNewValue =
      newValue === undefined
        ? JSON.stringify('undefined')
        : JSON.stringify(newValue);

    if (value !== null) {
      localStorage.setItem(key, stringifiedNewValue);
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
