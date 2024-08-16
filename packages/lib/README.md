# LocalStorage Query

## 설명

로컬 스토리지를 좀 더 간편하게 사용하기 위해 만든 라이브러리입니다.

## 기능

- 로컬 스토리지에서 값 조회
- 로컬 스토리지에서 값 변경 (수정, 삭제)
- 로컬 스토리지에 key - value를 즉시 생성 및 초기화 (단, 로컬 스토리지에 key에 해당하는 값이 없는 경우)

## 사용법

### 설치

```bash
npm install @confidential-nt/localstorage-query
```

### 예제

#### Javascript

```jsx
const key = 'todo';

function App() {
  const { data, mutate, remove } = useLocalstorageQuery(key, [
    {
      title: '밥먹기',
      completed: false,
      id: '1',
    },
  ]); // key에 해당하는 값이 로컬 스토리지에 없을 경우, 주어진 initial value로 즉시 초기화됩니다. 그렇지 않은 경우 무시됩니다.

  // ... do something
}
```

#### Typescript

```jsx
type TodoItem = {
  title: string;
  completed: boolean;
  id: string;
};

const key = 'todo';

export default function App() {
  const { data, mutate, remove } = useLocalstorageQuery<TodoItem[]>(key, [
    {
      title: '밥먹기',
      completed: false,
      id: "1",
    },
  ]); // key에 해당하는 값이 로컬 스토리지에 없을 경우, 주어진 initial value로 즉시 초기화됩니다. 그렇지 않은 경우 무시됩니다.

  // ... do something
}
```

더 자세한 예제를 보려면 아래 링크를 클릭하세요.

[투두리스트 예시코드](https://github.com/confidential-nt/localstorage-query/blob/main/examples/app/src/App.tsx)

## 참조

### 구문

```jsx
useLocalstorageQuery(key);
useLocalstorageQuery(key, initialValue);
```

### 매개변수

- key: 로컬스토리지에서 key로 쓸 값을 지정합니다.
- initialValue(optional): 위에서 지정한 key에 대해 초기값으로 사용하고 싶은 value를 지정합니다. key에 해당하는 값이 로컬 스토리지에 없을 경우 주어진 initial value로 즉시 초기화됩니다. 그렇지 않은 경우 무시됩니다.

### 반환 값

다음 객체를 반환합니다.

```jsx
const { data, mutate, remove } = useLocalstorageQuery(key);
```

- data: 로컬 스토리지에 저장했던 값을 반환합니다.
- mutate(newData): 로컬 스토리지에 저장한 값을 변경하는 함수입니다. 매개변수로 변경된 데이터를 넣어줍니다. 불변성을 유지해야합니다.
- remove(): 로컬 스토리지에 저장했던 key에 해당하는 값을 전부 지우는 함수입니다.
