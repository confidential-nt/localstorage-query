import { useCallback, useEffect, useRef, useState } from 'react';

export default function useLocalstorageQuery<T = undefined>(
  key: string,
  initialValue?: T | null
) {
  const [data, setData] = useState<T | null>();
  const isFirstRender = useRef(true);
  const prevStringifiedInitialValue = useRef('');

  const stringifiedInitialValue =
    initialValue !== undefined
      ? JSON.stringify(initialValue)
      : JSON.stringify('undefined');

  warnInfiniteLoop(
    isFirstRender.current,
    prevStringifiedInitialValue.current,
    stringifiedInitialValue
  );

  prevStringifiedInitialValue.current = stringifiedInitialValue;
  isFirstRender.current = false;

  const value = localStorage.getItem(key);

  const notNullValueAndNotUndefined =
    value !== null && value !== JSON.stringify('undefined');

  const notNullValueButUndefined =
    value !== null && value === JSON.stringify('undefined');

  const deleted = value === null && data === null;

  warnIfLocalStorageKeyExists(
    notNullValueAndNotUndefined,
    notNullValueButUndefined,
    initialValue
  );

  useEffect(() => {
    if (deleted) {
      return;
    }

    if (notNullValueAndNotUndefined) {
      const parsed = JSON.parse(value);
      setData(parsed);
      return;
    }

    if (notNullValueButUndefined) {
      return;
    }

    if (stringifiedInitialValue !== JSON.stringify('undefined')) {
      localStorage.setItem(key, stringifiedInitialValue);
      setData(JSON.parse(stringifiedInitialValue));
      return;
    }

    localStorage.setItem(key, JSON.stringify('undefined'));
  }, [
    key,
    notNullValueAndNotUndefined,
    notNullValueButUndefined,
    stringifiedInitialValue,
    deleted,
    value,
  ]);

  const mutate = useCallback(
    (newValue: T) => {
      const value = localStorage.getItem(key);

      const stringifiedNewValue =
        newValue === undefined
          ? JSON.stringify('undefined')
          : JSON.stringify(newValue);

      if (value !== null) {
        localStorage.setItem(key, stringifiedNewValue);
        setData(newValue);
      }
    },
    [key]
  );

  const remove = useCallback(() => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      localStorage.removeItem(key);
      setData(null);
    }
  }, [key]);

  return {
    data,
    mutate,
    remove,
  };
}

function warning(message: string) {
  console.warn(message);
}

function warnInfiniteLoop(
  isFirstRender: boolean,
  prevStringifiedInitialValue: string,
  stringifiedInitialValue: string
) {
  if (
    !isFirstRender &&
    prevStringifiedInitialValue !== stringifiedInitialValue
  ) {
    warning(
      '들어오는 initialValue가 매번 달라지므로 무한 리렌더링에 빠질 수 있습니다.'
    );
  }
}

function warnIfLocalStorageKeyExists<T>(
  notNullValueAndNotUndefined: boolean,
  notNullValueButUndefined: boolean,
  initialValue?: T | null
) {
  if (
    initialValue &&
    (notNullValueAndNotUndefined || notNullValueButUndefined)
  ) {
    warning(
      '해당 key에 대한 값이 로컬 스토리지에 이미 설정되어있으므로, 원하는 initialValue로 초기화되지 않았을수도 있습니다. 원하지 않는 동작이라면 로컬 스토리지에서 해당 key에 대한 값을 삭제하세요.'
    );
  }
}
