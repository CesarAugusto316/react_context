import axios from 'axios';
import type { ToDo } from '../context/todosReducer';


interface Data {
  allTodos: ToDo[],
  todo: ToDo
}

export class RestAPI {
  #apiUrl = import.meta.env.VITE_TODOS_API_URL;

  getAll() {
    return new Promise<Data>((resolve, reject) => {
      axios.get(this.#apiUrl)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getById(id:string) {
    return new Promise<Data>((resolve, reject) => {
      axios.get(`${this.#apiUrl}/${id}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  create(todo: string) {
    return new Promise<Data>((resolve, reject) => {
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

  delete(id:string) {
    return new Promise<Data>((resolve, reject) => {
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

  update(id:string, todo:string, completed:boolean) {
    return new Promise<Data>((resolve, reject) => {
      axios.patch(`${this.#apiUrl}/${id}`, {
        todo: todo.trim(),
        completed,
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
