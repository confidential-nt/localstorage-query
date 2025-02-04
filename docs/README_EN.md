# LocalStorage Query

## Description

A library designed to make working with localStorage more convenient.

## Features

- Retrieve values from localStorage
- Modify or delete values in localStorage
- Instantly create and initialize a key-value pair in localStorage (only if the key does not already exist)

## Usage

### Installation

```bash
npm install @confidential-nt/localstorage-query
```

### Example

#### JavaScript

```jsx
const key = "todo";

function App() {
  const { data, mutate, remove } = useLocalstorageQuery(key, [
    {
      title: "Eat food",
      completed: false,
      id: "1",
    },
  ]); // If the specified key does not exist in localStorage, it will be initialized with the given initial value. Otherwise, it will be ignored.

  // ... do something
}
```

#### TypeScript

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
      title: 'Eat food',
      completed: false,
      id: "1",
    },
  ]); // If the specified key does not exist in localStorage, it will be initialized with the given initial value. Otherwise, it will be ignored.

  // ... do something
}
```

For more detailed examples, check out the links below:

- [Todo List Example Code](https://github.com/confidential-nt/localstorage-query/blob/main/examples/app/src/App.tsx)
- [Todo List Demo](https://localstorage-query.vercel.app/)

## Reference

### Syntax

```jsx
useLocalstorageQuery(key);
useLocalstorageQuery(key, initialValue);
```

### Parameters

- `key`: The key to use in localStorage.
- `initialValue` (optional): The initial value to set for the given key if it does not already exist in localStorage. If the key exists, the initial value will be ignored.

### Return Value

Returns the following object:

```jsx
const { data, mutate, remove } = useLocalstorageQuery(key);
```

- `data`: Returns the value stored in localStorage.
- `mutate(newData)`: A function to update the stored value. Pass the new data as a parameter. **Make sure to maintain immutability.**
- `remove()`: A function to completely remove the stored value associated with the key.
