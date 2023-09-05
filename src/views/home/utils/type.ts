export interface TodoListResponse {
  tasks: ITask[];
  pageNumber: number;
  totalPages: number;
}

export enum TaskStatus {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: TaskStatus;
}

export interface IGroupDateTask {
  date: string;
  tasks: ITask[];
}
