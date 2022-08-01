import { FC } from 'react';
import '@animxyz/core';
import { XyzTransitionGroup } from '@animxyz/react';
import { useTodos } from '../../context';
import { Todo } from './Todo';
import './todos.css';


export const TodosList: FC = () => {
  const { allTodos } = useTodos();

  return (
    <XyzTransitionGroup
      appear
      xyz="fade up-100% ease-in-out-back"
      className="todos-list"
    >
      {allTodos.map(({ _id, completed, todo }) => {
        return (
          <div key={_id} className="todo-item">
            <Todo id={_id} todo={todo} completed={completed} />
          </div>
        );
      })}
    </XyzTransitionGroup>
  );
};
