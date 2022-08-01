import {
  FC, createContext, ReactNode, useContext, useEffect, useReducer,
} from 'react';
import { toast } from 'react-toastify';
import { RestAPI } from '../services/RestAPI.class';
import { actionCreators, initialState, todosReducer } from './todosReducer';
import type { ToDo } from './todosReducer';


interface ContextProps {
  allTodos: ToDo[],
  lastTodo: ToDo,
  isLoaded: boolean,
  error: string,
  onAppendTodo(inputValue: string) : void,
  onDeleteTodo(id: string) : void,
  onUpdateTodo(id: string, todoValue: string, completed: boolean) : void
}

const Context = createContext({} as ContextProps);

export const useTodos = () => {
  return useContext(Context);
};

const toDosService = new RestAPI();

const {
  fetchStart, fetchSuccess, fetchFail, deleteTodo, createTodo, updateTodo,
} = actionCreators;

export const TodosProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, initialState);

  /**
   *
   * @description we create a todo in database first before
   * updating the UI.
   */
  const onAppendTodo = async (inputValue:string) => {
    let myToast;
    try {
      const { todo } = await toDosService.create(inputValue); // appends to the server
      if (todo) {
        myToast = toast.success('Creating todo...');
        dispatch(createTodo(todo)); // apppends to the UI
      }
    } catch (error) {
      toast.dismiss(myToast);
      toast.error('Todo already exists!');
    }
  };

  /**
   *
   * @description we delete a todo in database first before
   * updating the UI.
   */
  const onDeleteTodo = async (id: string) => {
    const myToast = toast.success('Deleting...');
    try {
      const { todo } = await toDosService.delete(id); // deletes from server
      if (todo === null) {
        dispatch(deleteTodo(id)); // deletes from UI
      }
    } catch (error) {
      dispatch(fetchFail(error as string));
      toast.dismiss(myToast);
      toast.error('there was an error deleting');
    }
  };

  /**
   *
   * @description we update a todo in database first before
   * updating the UI.
   */
  const onUpdateTodo = async (id: string, todoValue: string, completed: boolean) => {
    const myToast = toast.success('Saving...');
    try {
      const { todo } = await toDosService.update(id, todoValue, completed);
      if (todo) {
        dispatch(updateTodo(id)); // not really necesary, react is reactive!
      }
    } catch (error) {
      dispatch(fetchFail(error as string));
      toast.dismiss(myToast);
      toast.error('there was an error updating');
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
    <Context.Provider value={{
      ...todos, onDeleteTodo, onAppendTodo, onUpdateTodo,
    }}
    >
      {children}
    </Context.Provider>
  );
};
