import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import {
  IComment,
  ITask,
  ITaskFormControls,
  TaskStatus,
} from '../models/task.interface';
import { generateUniqueId } from '../utils/generate-unique-id-with-timestamp';
import { EStatus } from '../models/task-status.enum';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasksTodo$ = new BehaviorSubject<ITask[]>(
    this.getTasksFromLocalStorage(EStatus.DO_TO),
  );
  private _tasksDoing$ = new BehaviorSubject<ITask[]>(
    this.getTasksFromLocalStorage(EStatus.DOING),
  );
  private _tasksDone$ = new BehaviorSubject<ITask[]>(
    this.getTasksFromLocalStorage(EStatus.DONE),
  );

  readonly tasksTodo = this._tasksTodo$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap(() =>
      this.saveTasksOnLocalStorage(EStatus.DO_TO, this._tasksTodo$.value),
    ),
  );
  readonly tasksDoing = this._tasksDoing$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap(() =>
      this.saveTasksOnLocalStorage(EStatus.DOING, this._tasksDoing$.value),
    ),
  );
  readonly tasksDone = this._tasksDone$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap(() =>
      this.saveTasksOnLocalStorage(EStatus.DONE, this._tasksDone$.value),
    ),
  );

  addTask(formData: ITaskFormControls) {
    const newTask: ITask = {
      id: generateUniqueId(),
      ...formData,
      status: EStatus.DO_TO,
      comments: [],
    };
    this._tasksTodo$.next([...this._tasksTodo$.value, newTask]);
  }

  removeTask(taskId: string, status: TaskStatus) {
    const subject = this.getTaskListByStatus(status);
    subject.next(subject.value.filter((t) => t.id !== taskId));
  }

  updateTask(task: ITask) {
    const subject = this.getTaskListByStatus(task.status);
    const index = subject.value.findIndex((t) => t.id === task.id);
    if (index === -1) return;

    const newList = [...subject.value];
    newList[index] = { ...task };
    subject.next(newList);
  }

  moveTask(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    taskNextStatus: TaskStatus,
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const nextTaskList = this.getTaskListByStatus(taskNextStatus);
    const currentTask = currentTaskList.value.find(
      (task) => task.id === taskId,
    );

    if (currentTask) {
      currentTask.status = taskNextStatus;
      const currentTaskListWithoutTask = currentTaskList.value.filter(
        (task) => task.id !== taskId,
      );
      currentTaskList.next([...currentTaskListWithoutTask]);
      nextTaskList.next([...nextTaskList.value, { ...currentTask }]);
    }
  }

  addComment(task: ITask, comment: IComment) {
    const subject = this.getTaskListByStatus(task.status);
    const index = subject.value.findIndex((t) => t.id === task.id);
    if (index === -1) return;

    const newList = [...subject.value];
    newList[index] = {
      ...newList[index],
      comments: [...(newList[index].comments || []), comment],
    };
    subject.next(newList);
  }

  removeComment(taskId: string, status: TaskStatus, commentId: string) {
    const subject = this.getTaskListByStatus(status);
    const index = subject.value.findIndex((t) => t.id === taskId);
    if (index === -1) return;

    const newList = [...subject.value];
    newList[index] = {
      ...newList[index],
      comments: (newList[index].comments || []).filter(
        (c) => c.id !== commentId,
      ),
    };
    subject.next(newList);
  }

  private saveTasksOnLocalStorage(key: string, tasks: ITask[]) {
    try {
      localStorage.setItem(key, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }

  private getTasksFromLocalStorage(key: EStatus) {
    try {
      const tasks = localStorage.getItem(key);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  private getTaskListByStatus(status: TaskStatus): BehaviorSubject<ITask[]> {
    const taskListObject = {
      [EStatus.DO_TO]: this._tasksTodo$,
      [EStatus.DOING]: this._tasksDoing$,
      [EStatus.DONE]: this._tasksDone$,
    };
    return taskListObject[status];
  }
}

