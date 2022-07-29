import { FC, FormEventHandler, useState } from 'react';
import './formInput.css';
import { useTodos } from '../../context';


export const FormInput: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { onAppendTodo } = useTodos();

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    onAppendTodo(inputValue);
    setInputValue('');
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <input
        className="form__input"
        type="text"
        value={inputValue}
        placeholder="write a todo"
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
};
