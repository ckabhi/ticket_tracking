export interface TodoDetailsPayload {
  userId: string;
}
export interface TodoDetailsAction {
  type: string;
  payload: any;
}

export interface TodoDetails {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface SaveTodoDetailsAction {
  type: string;
  data: TodoDetails;
}
