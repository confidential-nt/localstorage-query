import { renderHook, act } from '@testing-library/react';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest';
import useLocalstorageQuery from '..';
import localStorageMock from './mocks/localstorageMock';

beforeAll(() => {
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock(),
  });
});

afterAll(() => {
  Object.defineProperty(global, 'localStorage', {
    value: null,
  });
});

describe('useLocalStorageQuery Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('data에 대한 테스트', () => {
    describe('초기값을 줬을 때에 대한 테스트', () => {
      test('이미 key에 대한 value가 있을 때 data는 value 여야 한다.', () => {
        localStorage.setItem('key', JSON.stringify('stored'));
        const { result } = renderHook(() =>
          useLocalstorageQuery('key', 'initial')
        );
        expect(result.current.data).toBe('stored');
      });

      test('이미 key에 대한 value가 없을 때 data는 초기값이어야 한다', () => {
        const { result } = renderHook(() =>
          useLocalstorageQuery('key', 'initial')
        );
        expect(result.current.data).toBe('initial');
      });
    });

    describe('초기값을 안줬을 때에 대한 테스트', () => {
      test('이미 key에 대한 value가 있을 때 data는 value 여야 한다.', () => {
        localStorage.setItem('key', JSON.stringify('stored'));
        const { result } = renderHook(() => useLocalstorageQuery('key'));
        expect(result.current.data).toBe('stored');
      });

      test('이미 key에 대한 value가 없을 때 data는 undefined 여야 한다', () => {
        const { result } = renderHook(() => useLocalstorageQuery('key'));
        expect(result.current.data).toBe(undefined);
      });
    });
  });

  describe('mutate에 대한 테스트', () => {
    test('인자로 넣은 value로 데이터가 변경이 되어야한다', () => {
      const { result } = renderHook(() =>
        useLocalstorageQuery('key', 'initial')
      );

      act(() => {
        result.current.mutate('second');
      });

      expect(result.current.data).toBe('second');
    });
  });
  describe('remove에 대한 테스트', () => {
    test('data가 null 이어야한다.', () => {
      const { result } = renderHook(() =>
        useLocalstorageQuery<string>('key', 'initial')
      );

      act(() => {
        result.current.remove();
      });

      expect(result.current.data).toBeNull();
    });
  });
});
