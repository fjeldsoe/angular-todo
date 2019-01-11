import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import Todo from '../todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoService]
})
export class TodoListComponent implements OnInit {
  todoTitle: string;
  todos: object[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoTitle = '';
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.fetchTodos().subscribe(todos => this.todos = todos);
  }

  addTodo() {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    const todo = {
      title: this.todoTitle,
      completed: false
    }

    this.todoService.addTodo(todo).subscribe(todo => this.todos.push(todo));

    this.todoTitle = '';
  }

  todoMarkedCompleteHandler(editedTodo) {
    this.todos = this.todos.map(todo => todo['id'] === editedTodo.id ? {...todo, ...editedTodo} : todo);
  }

  todoDeletedHandler(id) {
    this.todos = this.todos.filter(todo => todo['id'] !== id);
  }

}
