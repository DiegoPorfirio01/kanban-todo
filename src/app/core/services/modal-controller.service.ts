import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TaskFormModalComponent } from '../../features/task/components/task-form-modal/task-form-modal.component';
import { TaskCommentsModalComponent } from '../../features/task/components/task-comments-modal/task-comments-modal.component';
import {
  ETaskModalMode,
  ITask,
  ITaskFormControls,
} from '../../features/task/models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalControllerService {
  private readonly _dialog = inject(Dialog);
  private _modalSizeOptions = {
    height: '620px',
    width: '95%',
  };

  openNewTaskModal() {
    return this._dialog.open<ITaskFormControls>(TaskFormModalComponent, {
      ...this._modalSizeOptions,
      disableClose: true,
      data: {
        mode: ETaskModalMode.CREATE,
        formValues: {
          name: '',
          description: '',
        },
      },
    });
  }

  openEditTaskModal(formValues: ITaskFormControls) {
    return this._dialog.open<ITaskFormControls>(TaskFormModalComponent, {
      ...this._modalSizeOptions,
      disableClose: true,
      data: {
        mode: ETaskModalMode.EDIT,
        formValues,
      },
    });
  }

  openTaskCommentModal(task: ITask) {
    return this._dialog.open<ITask>(TaskCommentsModalComponent, {
      ...this._modalSizeOptions,
      disableClose: true,
      data: task,
    });
  }
}

