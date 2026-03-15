import { EStatus } from '../models/task-status.enum';

export interface IComment {
  id: string;
  description: string;
}

export type TaskStatus = (typeof EStatus)[keyof typeof EStatus];

export interface ITask {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  comments?: IComment[];
}

export enum ETaskModalMode {
  CREATE = 'create',
  EDIT = 'edit',
  COMMENT = 'comment',
}

export interface ITaskFormControls {
  name: string;
  description: string;
}

export interface ITaskFormModalData {
  mode: ETaskModalMode;
  formValues: ITaskFormControls;
}

