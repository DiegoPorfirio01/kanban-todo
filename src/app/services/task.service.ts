import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ITask, ITaskFormControls } from '../interfaces/task-interface';
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

  verificaTasks() {
    console.log('Lista nos service', this._tasksTodo$.value);
  }
}
