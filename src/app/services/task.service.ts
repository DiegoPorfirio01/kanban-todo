import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import {
  IComment,
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

  removeTask(taskId: string, status: TaskStatus) {
    const currentList = this.getTaskListByStatus(status);

    const taskIndex = currentList.value.findIndex((item) => item.id === taskId);

    if (taskIndex === -1) return;

    currentList.value.splice(taskIndex, 1);

    currentList.next(currentList.value);
  }

  addComment(task: ITask, comment: IComment) {
    const currentList = this.getTaskListByStatus(task.status);

    const taskIndex = currentList.value.findIndex(
      (item) => item.id === task.id,
    );

    if (taskIndex === -1) return;

    const updateList = [...currentList.value];

    updateList[taskIndex].comments = [...(task.comments ?? []), comment];

    currentList.next(updateList);
  }

  removeComment(taskId: string, status: TaskStatus, commentId: string) {
    const currentList = this.getTaskListByStatus(status);

    const taskIndex = currentList.value.findIndex((item) => item.id === taskId);

    if (taskIndex === -1) return;

    currentList.value[taskIndex].comments = currentList.value[
      taskIndex
    ].comments?.filter((item) => item.id !== commentId);

    currentList.next(currentList.value);
  }

  updateTask(task: ITask) {
    const currentList = this.getTaskListByStatus(task.status);
    console.log(currentList.value);
    const taskIndex = currentList.value.findIndex(
      (item) => item.id === task.id,
    );

    if (taskIndex === -1) return;

    currentList.value[taskIndex] = {
      ...currentList.value[taskIndex],
      ...task,
    };

    currentList.next(currentList.value);
  }

  // moveTask({
  //   taskId,
  //   taskCurrentStatus,
  //   droppedColumn,
  // }: {
  //   taskId: string;
  //   taskCurrentStatus: TaskStatus;
  //   droppedColumn: TaskStatus;
  // }) {
  //   const currentList = this.getTaskListByStatus(taskCurrentStatus);
  //   const taskIndex = currentList.value.findIndex((item) => item.id === taskId);

  //   if (taskIndex === -1) return;

  //   currentList.value[taskIndex].status = droppedColumn;

  //   currentList.next(currentList.value);
  // }

  private getTaskListByStatus(status: TaskStatus) {
    const taskListObject = {
      [EStatus.DO_TO]: this._tasksTodo$,
      [EStatus.DOING]: this._tasksDoing$,
      [EStatus.DONE]: this._tasksDone$,
    };

    return taskListObject[status];
  }
}
