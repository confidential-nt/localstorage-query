## LocalStorage Query

### 설명

LocalStorage를 좀 더 간편하게 사용하기 위해 만든 라이브러리입니다.

### 사용법

#### 설치

```bash
npm install @confidential-nt/localstorage-query
```

#### 코드 작성

```jsx
const key = 'todo';

function App() {
  const { data, mutate, remove } = useLocalstorageQuery(key, [
    {
      title: '밥먹기',
      completed: false,
      id: 1,
    },
  ]);

  // ... do something
}
```
