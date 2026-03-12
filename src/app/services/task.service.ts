import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import {
  ITask,
  ITaskFormControls,
  TaskStatus,
} from '../interfaces/task-interface';
import { generateUniqueId } from '../utils/generate-unique-id-with-timestamp';
import { EStatus } from '../enum';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasksTodo$ = new BehaviorSubject<ITask[]>([]);
  private _tasksDoing$ = new BehaviorSubject<ITask[]>([]);
  private _tasksDone$ = new BehaviorSubject<ITask[]>([]);

  readonly tasksTodo = this._tasksTodo$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));
  readonly tasksDoing = this._tasksDoing$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));
  readonly tasksDone = this._tasksDone$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  constructor() {}

  addTask(formData: ITaskFormControls) {
    const newTask: ITask = {
      id: generateUniqueId(),
      ...formData,
      status: EStatus.DO_TO,
      comments: [],
    };

    const currentList = this._tasksTodo$.value;

    this._tasksTodo$.next([...currentList, newTask]);
  }

  moveTask({
    taskId,
    taskCurrentStatus,
    droppedColumn,
  }: {
    taskId: string;
    taskCurrentStatus: TaskStatus;
    droppedColumn: TaskStatus;
  }) {
    switch (droppedColumn) {
      case EStatus.DO_TO:
        const currentListTodo = this._tasksTodo$.value;
        const tasksTodo = currentListTodo.map((item) => {
          if (item.id === taskId) {
            item.status = droppedColumn;
          }
          return item;
        });

        this._tasksTodo$.next(tasksTodo);
        break;
      case EStatus.DOING:
        const currentListDoing = this._tasksDoing$.value;
        const tasksDoing = currentListDoing.map((item) => {
          if (item.id === taskId) {
            item.status = droppedColumn;
          }
          return item;
        });

        this._tasksDoing$.next(tasksDoing);
        break;
      case EStatus.DONE:
        const currentListDone = this._tasksDone$.value;
        const tasksDone = currentListDone.map((item) => {
          if (item.id === taskId) {
            item.status = droppedColumn;
          }
          return item;
        });

        this._tasksDone$.next(tasksDone);
        break;
    }
  }
}
