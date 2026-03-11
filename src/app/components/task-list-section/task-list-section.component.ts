import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITask } from '../../interfaces/task-interface';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-task-list-section',
  standalone: true,
  imports: [TaskCardComponent, CdkDropList, CdkDrag],
  templateUrl: './task-list-section.component.html',
  styleUrl: './task-list-section.component.css',
})
export class TaskListSectionComponent implements OnInit {
  todoTasks: ITask[] = [];
  doingTasks: ITask[] = [];
  doneTasks: ITask[] = [];

  ngOnInit(): void {
    this._tasksService.tasksTodo.subscribe((tasks) => {
      this.todoTasks = tasks;
    });

    this._tasksService.tasksDoing.subscribe((tasks) => {
      this.doingTasks = tasks;
    });

    this._tasksService.tasksDone.subscribe((tasks) => {
      this.doneTasks = tasks;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  private readonly _tasksService = inject(TaskService);
}
