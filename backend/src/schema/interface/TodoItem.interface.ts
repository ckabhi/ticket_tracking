export interface TodoItem {
  title: string;
  description: string;
  createdBy: string;
  assignedTo?: string;
  status?: "todo" | "working" | "completed";
  sharedWith?: string[];
  group?: string;
  comments?: Comments[];
  timeline?: string;
  metaData?: any;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Comments {
  userId: string;
  message: string;
  isDeleted?: boolean;
  createdAt: string;
}

export interface UpdateRequest {
  title?: string;
  description?: string;
  createdBy?: string;
  assignedTo?: string;
  status?: "todo" | "working" | "completed";
  sharedWith?: string[];
  group?: string;
  comments?: Comments[];
  timeline?: string;
}
