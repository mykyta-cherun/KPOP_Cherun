import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
})
export class TodoTableComponent implements OnInit {
  todos: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  onTodoClick(todo: any) {
    console.log('Clicked Todo:', todo);
  }
}
