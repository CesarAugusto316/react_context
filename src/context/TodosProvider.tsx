import {
  FC, createContext, useState, ReactNode, useContext,
} from 'react';


interface ContextProps {
  todosList: string[],
  onAppendTodo(inputValue:string):void,
  onDeleteTodo(index:number):void,
}

const Context = createContext({} as ContextProps);

export const useTodos = () => {
  return useContext(Context);
};

export const TodosProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [todosList, setTodosList] = useState<string[]>([]);

  const onAppendTodo = (inputValue:string) => {
    if (inputValue.trim().length > 0) {
      setTodosList((state) => {
        return [
          ...state, inputValue,
        ];
      });
    } else {
      alert('You must provide a todo');
    }
  };

  const onDeleteTodo = (index: number) => {
    setTodosList((state) => {
      return state.filter((__, i) => i !== index);
    });
  };

  return (
    <Context.Provider value={{ todosList, onDeleteTodo, onAppendTodo }}>
      {children}
    </Context.Provider>
  );
};
