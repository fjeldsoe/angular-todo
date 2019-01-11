import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../todo.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo;
  @Output() todoMarkedComplete = new EventEmitter();
  @Output() todoDeleted = new EventEmitter();

  constructor(private todoService: TodoService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'clear',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));
  }

  ngOnInit() {
  }

  markComplete(todo) {
    this.todoService.markComplete(todo).subscribe(todo => this.todoMarkedComplete.emit(todo));
  }

  deleteTodo(id) {
    this.todoService.deleteTodo(id).subscribe();
    this.todoDeleted.emit(id);
  }

}
