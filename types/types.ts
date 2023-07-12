export interface TodoList {
  id: number;
  name: string;
  todos: TodoItem[];
  created_at: Date;
  updated_at: Date;
}

export interface TodoItem {
  id: number;
  description: string;
  is_done: boolean;
  todo_list_id: number | undefined;
  created_at: Date;
  updated_at: Date;
}
