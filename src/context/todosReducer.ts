import { Reducer } from 'react';


export interface ToDo {
  todo: string,
  _id: string,
  completed: boolean
}

interface ToDosState {
  isLoaded: boolean,
  allTodos: ToDo[],
  lastTodo: ToDo
  error: string
}

interface Action {
  type: string,
  payload: ToDo[] | ToDo | string
}

enum actionTypes {
  FETCH_START= 'FETCH_START',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_ERROR= 'FETCH_ERROR',

  CREATE_TODO= 'CREATE_TODO',
  READ_TODO= 'READ_TODO',
  UPDATE_TODO= 'UPDATE_TODO',
  DELETE_TODO= 'DELETE_TODO',
}

export const actionCreators = {
  fetchStart: (): Action => {
    return {
      type: actionTypes.FETCH_START,
      payload: [],
    };
  },
  fetchSuccess: (payload: ToDo[]|ToDo): Action => {
    return {
      type: actionTypes.FETCH_SUCCESS,
      payload,
    };
  },
  fetchFail: (error: string): Action => {
    return {
      type: actionTypes.FETCH_ERROR,
      payload: error,
    };
  },

  // CRUDS
  createTodo: (todo: ToDo): Action => {
    return {
      type: actionTypes.CREATE_TODO,
      payload: todo,
    };
  },
  readTodo: (id: string): Action => {
    return {
      type: actionTypes.READ_TODO,
      payload: id,
    };
  },
  updateTodo: (id: string): Action => {
    return {
      type: actionTypes.UPDATE_TODO,
      payload: id,
    };
  },
  deleteTodo: (id: string): Action => {
    return {
      type: actionTypes.DELETE_TODO,
      payload: id,
    };
  },
};

export const initialState: ToDosState = {
  isLoaded: false,
  allTodos: [],
  lastTodo: {} as ToDo,
  error: '',
};

export const todosReducer: Reducer<ToDosState, Action> = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      if (!Array.isArray(action.payload)) {
        return {
          ...state,
          isLoaded: true,
          lastTodo: action.payload as ToDo,
          error: '',
        };
      }
      return {
        ...state,
        isLoaded: true,
        allTodos: action.payload as ToDo[],
        error: '',
      };

    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        isLoaded: true,
        error: action.payload as string,
      };

    case actionTypes.FETCH_START:
      return {
        ...state,
        error: '',
        isLoaded: false,
      };

    case actionTypes.CREATE_TODO: {
      return {
        ...state,
        error: '',
        isLoaded: true,
        allTodos: [...state.allTodos, action.payload as ToDo],
      };
    }

    case actionTypes.UPDATE_TODO: {
      return {
        ...state,
        error: '',
        isLoaded: true,
        allTodos: state.allTodos,
      };
    }

    case actionTypes.DELETE_TODO: {
      return {
        ...state,
        error: '',
        isLoaded: true,
        allTodos: state.allTodos.filter((todo) => todo._id !== action.payload),
      };
    }

    default:
      return state;
  }
};
