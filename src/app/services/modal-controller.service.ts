import { Component, inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { TaskFormModalComponent } from '../components/task-form-modal/task-form-modal.component';
import { TaskCommentsModalComponent } from '../components/task-comments-modal/task-comments-modal.component';

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
    return this._dialog.open(TaskFormModalComponent, {
      ...this._modalSizeOptions,
      data: {
        mode: 'create',
      },
    });
  }

  openEditTaskModal() {
    return this._dialog.open(TaskFormModalComponent, {
      ...this._modalSizeOptions,
      data: {
        mode: 'edit',
      },
    });
  }

  openTaskCommentModal() {
    return this._dialog.open(TaskCommentsModalComponent, {
      ...this._modalSizeOptions,
    });
  }

  constructor() {}
}
