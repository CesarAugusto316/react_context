import {
  FC, createContext, useState, ReactNode, useContext, useEffect,
} from 'react';
import { RestAPI } from '../services/RestAPI.class';


export interface ToDo {
  todo: string,
  _id: string,
}

interface ContextProps {
  todosList: ToDo[],
  onAppendTodo(inputValue:string):void,
  onDeleteTodo(id:string):void,
}

const Context = createContext({} as ContextProps);

export const useTodos = () => {
  return useContext(Context);
};

export const TodosProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [todosList, setTodosList] = useState<ToDo[]>([]);
  const todosService = new RestAPI();

  /**
   *
   * @description we should create a todo in database
   */
  const onAppendTodo = async (inputValue:string) => {
    try {
      const { todo } = await todosService.createTodo(inputValue);

      // if todo was added to DB we render it on the UI.
      if (todo) {
        setTodosList((state) => {
          return [
            ...state, todo,
          ];
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const onDeleteTodo = async (id: string) => {
    try {
      const { todo } = await todosService.deleteTodo(id);

      // once deleted from database we delete it from UI.
      if (todo === null) {
        setTodosList((state) => {
          return state.filter((item) => item._id !== id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    todosService.getAllTodos()
      .then((todos) => {
        setTodosList(todos);
        console.log(todos);
      });
  }, []);

  return (
    <Context.Provider value={{ todosList, onDeleteTodo, onAppendTodo }}>
      {children}
    </Context.Provider>
  );
};
