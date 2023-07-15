import {TodoList} from '../../types/types';
import {
  LISTS_ADDED,
  LISTS_REMOVED,
  LISTS_DISPLAYED,
  LISTS_EDITED,
} from '../reducers/lists';

export const addList = (payload: TodoList) => ({
  type: LISTS_ADDED,
  payload,
});

export const removeList = (payload: number) => ({
  type: LISTS_REMOVED,
  payload,
});

export const listDisplay = (payload: TodoList[]) => ({
  type: LISTS_DISPLAYED,
  payload,
});

export const editList = (payload: {id: number; name: string}) => ({
  type: LISTS_EDITED,
  payload,
});
