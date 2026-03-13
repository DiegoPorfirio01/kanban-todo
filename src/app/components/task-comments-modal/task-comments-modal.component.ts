import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { IComment, ITask } from '../../interfaces/task-interface';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { generateUniqueId } from '../../utils/generate-unique-id-with-timestamp';

@Component({
  selector: 'app-task-comments-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-comments-modal.component.html',
  styleUrl: './task-comments-modal.component.css',
})
export class TaskCommentsModalComponent {
  taskCommentsChanged = false;

  commentControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  readonly _task: ITask = inject(DIALOG_DATA);
  readonly _dialog: DialogRef<boolean> = inject(DialogRef);

  onAddComment() {
    if (this.commentControl.invalid) return;

    const newComment: IComment = {
      id: generateUniqueId(),
      description: this.commentControl.value!,
    };

    this._task.comments?.unshift(newComment);
    this.commentControl.reset();

    this.taskCommentsChanged = true;
  }

  onCloseModal() {
    this._dialog.close(this.taskCommentsChanged);
  }

  onDeleteComment(commentId: string) {
    this._task.comments = this._task.comments?.filter(
      (comment) => comment.id !== commentId,
    );

    this.taskCommentsChanged = true;
  }
}
