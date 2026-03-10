import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-task-form-modal',
  imports: [],
  templateUrl: './task-form-modal.component.html',
  styleUrl: './task-form-modal.component.css',
})
export class TaskFormModalComponent {
  readonly _data: { mode: 'create' | 'edit' | 'comment' } = inject(DIALOG_DATA);
}
