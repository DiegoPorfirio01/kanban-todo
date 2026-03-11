import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ETaskModalMode, ITaskFormModalData } from '../../interfaces/task-interface';
import { ModalControllerService } from '../../services/modal-controller.service';
@Component({
  selector: 'app-task-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-modal.component.html',
  styleUrl: './task-form-modal.component.css',
})
export class TaskFormModalComponent {
  readonly ETaskModalMode = ETaskModalMode;
  readonly _data: ITaskFormModalData = inject(DIALOG_DATA);
  readonly _modalService = inject(ModalControllerService);
  
  taskForm = new FormGroup({
    name: new FormControl<string>(this._data.formValues.name, [Validators.required, Validators.minLength(10)]),
    description: new FormControl<string>(this._data.formValues.description, [Validators.required, Validators.minLength(10)]),
  });

  closeTaskFormModal() {
    this._modalService.closeTaskFormModal();
  }

  onSubmit() {
    console.log(this.taskForm.value);
  }
}
