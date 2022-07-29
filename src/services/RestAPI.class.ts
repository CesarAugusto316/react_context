import axios from 'axios';
import type { ToDo } from '../context/TodosProvider';


export class RestAPI {
  #apiUrl = import.meta.env.VITE_TODOS_API_URL;

  getAllTodos() {
    return new Promise<ToDo[]>((resolve, reject) => {
      axios.get(this.#apiUrl)
        .then(({ data }) => {
          const todos:ToDo[] = data.allTodos;
          resolve(todos);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getTodoById(id:string) {
    return new Promise<ToDo>((resolve, reject) => {
      axios.get(this.#apiUrl, {
        params: {
          id,
        },
      })
        .then(({ data }) => {
          const { todo } = data;
          resolve(todo as ToDo);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  createTodo(todo: string) {
    return new Promise<{allTodos: ToDo[], todo: ToDo}>((resolve, reject) => {
      axios.post(this.#apiUrl, {
        todo: todo.trim(),
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteTodo(id:string) {
    return new Promise<{allTodos: ToDo[], todo: null}>((resolve, reject) => {
      axios.delete(`${this.#apiUrl}/${id}`, {
        headers: {
          Accept: '*/*',
          Authorization: '***',
        },
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
