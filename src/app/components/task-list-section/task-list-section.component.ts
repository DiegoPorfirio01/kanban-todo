import { Component, inject, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';
import { map, Observable } from 'rxjs';
import { ITask } from '../../interfaces/task-interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-list-section',
  standalone: true,
  imports: [TaskCardComponent, AsyncPipe],
  templateUrl: './task-list-section.component.html',
  styleUrl: './task-list-section.component.css',
})
export class TaskListSectionComponent implements OnInit {
  private readonly _tasksService = inject(TaskService);

  ngOnInit(): void {
    this._tasksService.tasksTodo.subscribe((tasks) => {
      console.log('task atuais', tasks);
      tasks[0].name = 'oi';

      this._tasksService.verificaTasks();
    });
  }
}
