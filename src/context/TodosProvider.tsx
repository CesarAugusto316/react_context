import {
  FC, createContext, ReactNode, useContext, useEffect, useReducer,
} from 'react';
import { RestAPI } from '../services/RestAPI.class';
import { actionCreators, initialState, todosReducer } from './todosReducer';
import type { ToDo } from './todosReducer';


interface ContextProps {
  allTodos: ToDo[],
  lastTodo: ToDo,
  isLoaded: boolean,
  error: string,
  onAppendTodo(inputValue:string):void,
  onDeleteTodo(id:string):void,
}

const Context = createContext({} as ContextProps);

export const useTodos = () => {
  return useContext(Context);
};

const toDosService = new RestAPI();

const {
  fetchStart, fetchSuccess, fetchFail, deleteTodo, createTodo,
} = actionCreators;

export const TodosProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, initialState);

  /**
   *
   * @description we should create a todo in database
   */
  const onAppendTodo = async (inputValue:string) => {
    try {
      const { todo } = await toDosService.create(inputValue);
      if (todo) {
        dispatch(createTodo(todo));
      }
    } catch (error) {
      dispatch(fetchFail(error as string));
      alert(error);
    }
  };

  const onDeleteTodo = async (id: string) => {
    try {
      const { todo } = await toDosService.delete(id); // deletes from server
      if (todo === null) {
        dispatch(deleteTodo(id)); // deletes from UI
      }
    } catch (error) {
      dispatch(fetchFail(error as string));
      alert(error);
    }
  };

  useEffect(() => {
    dispatch(fetchStart());

    toDosService.getAll()
      .then(({ allTodos }) => {
        dispatch(fetchSuccess(allTodos));
      })
      .catch((error) => {
        dispatch(fetchFail(error));
      });
  }, []);

  return (
    <Context.Provider value={{ ...todos, onDeleteTodo, onAppendTodo }}>
      {children}
    </Context.Provider>
  );
};
