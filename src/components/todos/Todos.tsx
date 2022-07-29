/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import '@animxyz/core';
import { XyzTransitionGroup } from '@animxyz/react';
import { FaTrashAlt } from 'react-icons/fa';
import './todos.css';
import { useTodos } from '../../context';


export const Todos: FC = () => {
  const { todosList, onDeleteTodo } = useTodos();

  return (
    <XyzTransitionGroup
      appear
      xyz="fade up-100% ease-in-out-back"
      className="todos-list"
    >
      {todosList.map((todo, index) => {
        return (
          <div key={index} className="todo-item">
            <div className="todo-item__text">
              <p>{todo}</p>
            </div>
            <FaTrashAlt
              className="todo-item__icon"
              onClick={() => onDeleteTodo(index)}
            />
          </div>
        );
      })}
    </XyzTransitionGroup>
  );
};
