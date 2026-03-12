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
import { AsyncPipe } from '@angular/common';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-task-list-section',
  standalone: true,
  imports: [TaskCardComponent, CdkDropList, CdkDrag, AsyncPipe],
  templateUrl: './task-list-section.component.html',
  styleUrl: './task-list-section.component.css',
})
export class TaskListSectionComponent {
  readonly _tasksService = inject(TaskService);

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
}
