import { FC } from 'react';
import '@animxyz/core';
import { XyzTransitionGroup } from '@animxyz/react';
import { FaTrashAlt } from 'react-icons/fa';
import './todos.css';
import { useTodos } from '../../context';


export const Todos: FC = () => {
  const { allTodos, onDeleteTodo } = useTodos();

  return (
    <XyzTransitionGroup
      appear
      xyz="fade up-100% ease-in-out-back"
      className="todos-list"
    >
      {allTodos.map((item) => {
        return (
          <div key={item._id} className="todo-item">
            <div className="todo-item__text">
              <p>{item.todo}</p>
            </div>
            <FaTrashAlt
              className="todo-item__icon"
              onClick={() => onDeleteTodo(item._id)}
            />
          </div>
        );
      })}
    </XyzTransitionGroup>
  );
};
