import { Component, inject, input } from '@angular/core';
import { ITask, ITaskFormControls } from '../../interfaces/task-interface';
import { ModalControllerService } from '../../services/modal-controller.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  // task = input<ITask>();

  private readonly _taskModalController = inject(ModalControllerService);

  openEditTaskModal() {
    const dialogRef = this._taskModalController.openEditTaskModal({
      name: 'oi',
      description: 'teste',
    });

    dialogRef.closed.subscribe((taskForm) => {
      console.log('Tarefa alterada: ', taskForm);
    });
  }

  openTaskCommentsModal() {
    this._taskModalController.openTaskCommentModal();
  }
}
