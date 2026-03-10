import { Component, inject, input } from '@angular/core';
import { ITask } from '../../interfaces/task-interface';
import { ModalControllerService } from '../../services/modal-controller.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  task = input.required<ITask>();

  private readonly _taskModalController = inject(ModalControllerService);

  openEditTaskModal() {
    this._taskModalController.openEditTaskModal();
  }

  openTaskCommentsModal() {
    this._taskModalController.openTaskCommentModal();
  }
}
