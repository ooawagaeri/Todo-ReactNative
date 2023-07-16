import {addItemAPI, editItemAPI, removeItemAPI} from '../thunks/itemsThunks';
import {isOffline, queueDispatch} from './offline';
import {TodoItem, TodoList} from '../../types/types';
import {Dispatch} from 'redux';
import store, {AppState} from '../configureStore';
import {ITEMS_ADDED, ITEMS_EDITED, ITEMS_REMOVED} from '../reducers/lists';

export function getTargetStateList(state: AppState, todo_list_id: number) {
  return state.lists.lists.filter(
    (list: TodoList) => list.id === todo_list_id,
  )[0].todos;
}

export const addItemOfflineAPI =
  (todoItem: {description: string; todo_list_id: number}) =>
  async (dispatch: Dispatch<any>) => {
    if (await isOffline()) {
      const state = store.getState();
      const targetList = getTargetStateList(state, todoItem.todo_list_id);
      const newItem: TodoItem = {
        id: targetList[0].id,
        description: todoItem.description,
        is_done: false,
        todo_list_id: todoItem.todo_list_id,
        created_at: new Date(),
        updated_at: new Date(),
      };
      dispatch(ITEMS_ADDED(newItem));
      queueDispatch(() => dispatch(addItemAPI(todoItem)));
    } else {
      dispatch(addItemAPI(todoItem));
    }
  };

export const removeItemOfflineAPI =
  (listId: number, id: number) => async (dispatch: Dispatch<any>) => {
    if (await isOffline()) {
      dispatch(ITEMS_REMOVED({listId, id}));
      queueDispatch(() => dispatch(removeItemAPI(listId, id)));
    } else {
      dispatch(removeItemAPI(listId, id));
    }
  };

export const editItemOfflineAPI =
  (
    listId: number,
    id: number,
    todoItem: {
      description: string | undefined;
      is_done: boolean | undefined;
    },
  ) =>
  async (dispatch: Dispatch<any>) => {
    if (await isOffline()) {
      const state = store.getState();
      const targetList = getTargetStateList(state, listId);
      const targetItem = targetList.filter(item => item.id === id)[0];
      const editedItem: TodoItem = {
        id: id,
        description: todoItem.description ?? targetItem.description,
        is_done: todoItem.is_done ?? targetItem.is_done,
        todo_list_id: listId,
        created_at: targetItem.created_at,
        updated_at: new Date(),
      };
      dispatch(ITEMS_EDITED(editedItem));
      queueDispatch(() => dispatch(editItemAPI(listId, id, todoItem)));
    } else {
      dispatch(editItemAPI(listId, id, todoItem));
    }
  };
