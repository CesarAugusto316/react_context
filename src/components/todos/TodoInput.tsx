import {
  FC, useState, useReducer, MouseEventHandler, KeyboardEventHandler,
} from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useTodos } from '../../context';


interface TodoInputProps {
  id: string,
  todo: string,
  completed: boolean
}

export const TodoInput: FC<TodoInputProps> = ({ id, todo, completed }) => {
  const { onDeleteTodo, onUpdateTodo } = useTodos();
  const [toggle, setToggle] = useReducer((state) => !state, false);
  const [inputValue, setInputValue] = useState(todo);
  const [completeTodo, setCompleteTodo] = useReducer((state) => !state, completed);

  const onInputHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      e.target.blur();
      onUpdateTodo(id, inputValue, completeTodo);
      setToggle();
    }
  };

  const onClickHandler: MouseEventHandler = () => {
    if (toggle === true) {
      onUpdateTodo(id, inputValue, completeTodo);
    }
    setToggle();
  };

  const onSetCompletedHandler: MouseEventHandler = () => {
    onUpdateTodo(id, inputValue, !completeTodo);
    setCompleteTodo();
  };

  return (
    <>
      <div className="todo-item__text">
        {toggle
          ? (
            <input
              id={`input-todo-${id}`}
              className="todo-item__input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onInputHandler}
              type="text"
              name={`input-${id}`}
            />
          )
          : (
            <p
              className={`${completeTodo && 'line-through '} 
              todo-item__text-content`}
              onClick={onSetCompletedHandler}
            >
              {inputValue}
            </p>
          )}
      </div>

      <span className="todo-item__icons-container">
        <label htmlFor={`input-todo-${id}`}>
          <FaEdit
            className={`todo-item__icon 
            ${toggle && ' todo-item__icon--accent '} 
            todo-item__icon--edit`}
            onClick={onClickHandler}
          />
        </label>
        <FaTrashAlt
          className="todo-item__icon"
          onClick={() => onDeleteTodo(id)}
        />
      </span>
    </>
  );
};
