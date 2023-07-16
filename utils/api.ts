import {TodoItem, TodoList} from '../types/types';
import axios from 'axios';

const base_url = 'http://10.0.2.2:8000/api';

interface MessagePayload {
  msg: string;
  data: any;
}

/**
 * --------------- Todo List APIs ---------------
 */
export async function getTodoLists(): Promise<TodoList[] | string> {
  const rawRes = await axios.get(base_url + '/todo-lists');
  const res = rawRes.data as MessagePayload;
  return res.data ? (res.data as TodoList[]) : (res.msg as string);
}

export async function getTodoListById(id: number): Promise<TodoList | string> {
  const rawRes = await axios.get(base_url + '/todo-lists/' + id);
  const res = rawRes.data as MessagePayload;
  return res.data ? (res.data as TodoList) : (res.msg as string);
}

export async function postTodoList(todoList: {
  name: string;
}): Promise<TodoList | string> {
  const rawRes = await axios.post(base_url + '/todo-lists', todoList);
  const res = rawRes.data as MessagePayload;
  return res.data ? (res.data as TodoList) : (res.msg as string);
}

export async function putTodoListById(
  id: number,
  todoList: {
    name: string;
  },
): Promise<TodoList | string> {
  const rawRes = await axios.put(base_url + '/todo-lists/' + id, todoList);
  const res = rawRes.data as MessagePayload;
  return res.data ? (res.data as TodoList) : (res.msg as string);
}

export async function deleteTodoListById(id: number): Promise<string> {
  const rawRes = await axios.delete(base_url + '/todo-lists/' + id);
  const res = rawRes.data as MessagePayload;
  return res.msg;
}

/**
 * --------------- Todo Item APIs ---------------
 */
export async function getTodoItems(): Promise<TodoItem[] | string> {
  const rawRes = await axios.get(base_url + '/todos');
  const res = rawRes.data as MessagePayload;
  return res.data ? (res.data as TodoItem[]) : (res.msg as string);
}

export async function getTodoItemById(id: number): Promise<TodoItem | string> {
  const rawRes = await axios.get(base_url + '/todos/' + id);
  const res = rawRes.data as MessagePayload;
  return res.data ? (res.data as TodoItem) : (res.msg as string);
}

export async function postTodoItem(todoItem: {
  description: string;
  todo_list_id: number;
}): Promise<TodoItem | string> {
  const rawRes = await axios.post(base_url + '/todos', todoItem);
  const res = rawRes.data as MessagePayload;
  return res.data ? (res.data as TodoItem) : (res.msg as string);
}

export async function putTodoItemById(
  id: number,
  todoItem: {
    description: string | undefined;
    is_done: boolean | undefined;
  },
): Promise<TodoItem | string> {
  const rawRes = await axios.put(base_url + '/todos/' + id, todoItem);
  const res = rawRes.data as MessagePayload;
  return res.data ? (res.data as TodoItem) : (res.msg as string);
}

export async function deleteTodoItemById(id: number): Promise<string> {
  const rawRes = await axios.delete(base_url + '/todos/' + id);
  const res = rawRes.data as MessagePayload;
  return res.msg;
}

export async function putSyncData(
  allLists: TodoList[],
): Promise<TodoList[] | string> {
  const payload = {
    data: allLists,
  };
  const rawRes = await axios.put(base_url + '/sync', payload);
  const res = rawRes.data as MessagePayload;
  return res.data ? (res.data as TodoList[]) : (res.msg as string);
}
