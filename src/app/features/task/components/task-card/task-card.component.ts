import { Component, Input, inject } from '@angular/core';
import { ITask } from '../../models/task.interface';
import { ModalControllerService } from '../../../../core/services/modal-controller.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: ITask;

  private readonly _taskModalController = inject(ModalControllerService);
  private readonly _taskService = inject(TaskService);

  openEditTaskModal() {
    const dialogRef = this._taskModalController.openEditTaskModal(this.task);

    dialogRef.closed.subscribe((taskForm) => {
      if (!taskForm) return;
      this.task.name = taskForm.name;
      this.task.description = taskForm.description;

      this._taskService.updateTask(this.task);
    });
  }

  removeTask() {
    this._taskService.removeTask(this.task.id, this.task.status);
  }

  openTaskCommentsModal() {
    const dialogRef = this._taskModalController.openTaskCommentModal(this.task);

    dialogRef.closed.subscribe((taskCommentsChanged) => {
      if (!taskCommentsChanged) return;
      this._taskService.updateTask(this.task);
    });
  }

  removeCommentFromTask(commentId: string) {
    this._taskService.removeComment(this.task.id, this.task.status, commentId);
  }
}

