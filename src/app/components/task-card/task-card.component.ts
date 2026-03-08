import { Component, input } from '@angular/core';
import { ITask } from '../../interfaces/task-interface';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  task = input.required<ITask>();
}
