import useLocalstorageQuery from '@confidential-nt/localstorage-query';
import { FormEvent, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

type TodoItem = {
  title: string;
  completed: boolean;
  id: string;
};

const key = 'todo';
const uuid = uuidv4(); // 매 렌더링마다 새롭게 생성되는 요소가 없도록 유의해야 합니다. 그렇지 않으면 내부적으로 무한 리렌더링이 일어나게 됩니다.

export default function App() {
  const { data, mutate, remove } = useLocalstorageQuery<TodoItem[]>(key, [
    {
      title: '밥먹기',
      completed: false,
      id: uuid,
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current && data) {
      const newTodo = {
        title: inputRef.current.value,
        completed: false,
        id: uuidv4(),
      };
      mutate([...data, newTodo]); // CRUD 모든 작업에 mutate 함수를 사용할 수 있습니다. 다만, 불변성을 유지하도록 하세요.
      inputRef.current.value = '';
    }
  };

  const handleDelete = (id: string) => {
    if (data) {
      const newData = data.filter((d) => d.id !== id);
      mutate(newData);
    }
  };

  const handleCheck = (checked: TodoItem) => {
    if (data) {
      const newTodo = {
        ...checked,
        completed: !checked.completed,
      };
      const newData = [...data];
      const index = newData.findIndex((d) => d.id === checked.id);
      newData[index] = newTodo;
      mutate(newData);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Type Todo..." ref={inputRef} />
      </form>
      <ul>
        {data &&
          data.length > 0 &&
          data.map((d) => (
            <li key={d.id}>
              {d.title}{' '}
              <input
                type="checkbox"
                checked={d.completed}
                onChange={() => handleCheck(d)}
              />
              <button onClick={() => handleDelete(d.id)}>Delete</button>
            </li>
          ))}
      </ul>
      <button onClick={() => remove()}>Delete All Todos</button>
    </>
  );
}
