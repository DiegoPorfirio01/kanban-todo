export interface ITask {
  id: string;
  name: string;
  description?: string;
  status: EStatus;
  comments?: { id: string; description: string }[];
}

export enum EStatus {
  DO_TO = 'do-to',
  DOING = 'doing',
  DONE = 'done',
}
