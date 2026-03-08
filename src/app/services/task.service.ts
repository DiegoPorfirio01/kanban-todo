import { Injectable } from '@angular/core';
import { EStatus, ITask } from '../interfaces/task-interface';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks = new BehaviorSubject<{ [key: string]: ITask[] }>({
    [EStatus.DO_TO]: [
      {
        name: 'testeDOTO',
        description: '',
        status: EStatus.DO_TO,
        id: crypto.randomUUID(),
      },
      {
        name: 'teste2DOTO',
        description: '',
        status: EStatus.DO_TO,
        id: crypto.randomUUID(),
      },
      {
        name: 'teste3DOTO',
        description: '',
        status: EStatus.DO_TO,
        id: crypto.randomUUID(),
      },
    ],
    [EStatus.DOING]: [
      {
        name: 'testeDOING',
        description: '',
        status: EStatus.DOING,
        id: crypto.randomUUID(),
      },
      {
        name: 'teste2DOING',
        description: '',
        status: EStatus.DOING,
        id: crypto.randomUUID(),
      },
      {
        name: 'teste3DOING',
        description: '',
        status: EStatus.DOING,
        id: crypto.randomUUID(),
      },
    ],
    [EStatus.DONE]: [
      {
        name: 'testeDONE',
        description: '',
        status: EStatus.DONE,
        id: crypto.randomUUID(),
      },
      {
        name: 'teste2DONE',
        description: '',
        status: EStatus.DONE,
        id: crypto.randomUUID(),
      },
      {
        name: 'teste3DONE',
        description: '',
        status: EStatus.DONE,
        id: crypto.randomUUID(),
      },
    ],
  });

  constructor() {}

  public tasks$ = this._tasks
    .asObservable()
    .pipe(map((task) => structuredClone(task)));

  getValue() {
    return structuredClone(this._tasks.value);
  }

  addTask(task: ITask, status: EStatus) {
    this._tasks.next({
      ...this._tasks.value,
      [status]: [...this._tasks.value[status], task],
    });
  }

  editTask(id: string, newValuesTask: ITask, status: EStatus) {
    const currentValues = this._tasks.value;

    let found = false;
    const updatedValues = currentValues[status].map((item) => {
      if (item.id === id) {
        found = true;

        return { ...item, ...newValuesTask, status };
      }

      return item;
    });

    if (!found) {
      throw Error('Task not found');
    }

    this._tasks.next({
      ...this._tasks.value,
      [status]: updatedValues,
    });
  }

  deleteTask(id: string, status: EStatus) {
    this._tasks.next({
      ...this._tasks.value,
      [status]: this._tasks.value[status].filter(
        (item) => item.id !== id && item.status !== status,
      ),
    });
  }
}
