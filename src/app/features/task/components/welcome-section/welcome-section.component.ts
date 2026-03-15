import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../../../core/services/modal-controller.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-welcome-section',
  standalone: true,
  imports: [],
  templateUrl: './welcome-section.component.html',
  styleUrl: './welcome-section.component.css',
})
export class WelcomeSectionComponent {
  private readonly _taskModalController = inject(ModalControllerService);
  private readonly _taskService = inject(TaskService);

  openNewTaskModal() {
    const dialogRef = this._taskModalController.openNewTaskModal();

    dialogRef.closed.subscribe((taskForm) => {
      if (taskForm) this._taskService.addTask(taskForm);
    });
  }
}

