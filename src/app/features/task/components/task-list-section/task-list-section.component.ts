import { Component, inject } from '@angular/core';
import { TaskService } from '../../../task/services/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITask, TaskStatus } from '../../models/task.interface';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task-list-section',
  standalone: true,
  imports: [TaskCardComponent, CdkDropList, CdkDrag, AsyncPipe, JsonPipe],
  templateUrl: './task-list-section.component.html',
  styleUrl: './task-list-section.component.css',
})
export class TaskListSectionComponent {
  readonly _tasksService = inject(TaskService);

  onCardDrop(event: CdkDragDrop<ITask[]>) {
    this.moveCardToColumn(event);

    const taskId = event.item.data.id;
    const taskCurrentStatus = event.item.data.status;
    const droppedColumn = event.container.id as TaskStatus;

    this.updateTaskStatus(taskId, taskCurrentStatus, droppedColumn);
  }

  private updateTaskStatus(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    droppedColumn: TaskStatus,
  ) {
    this._tasksService.moveTask(taskId, taskCurrentStatus, droppedColumn);
  }

  private moveCardToColumn(event: CdkDragDrop<ITask[]>) {
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

