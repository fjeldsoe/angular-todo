import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Todo from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url)
  }

  addTodo(data): Observable<Todo[]> {
    return this.http.post<Todo[]>(this.url, data)
  }

  markComplete(todo): Observable<Todo[]> {
    return this.http.put<Todo[]>(this.url + '/' + todo.id, todo)
  }

  deleteTodo(id): Observable<Todo[]> {
    return this.http.delete<Todo[]>(this.url + '/' + id)
  }
}