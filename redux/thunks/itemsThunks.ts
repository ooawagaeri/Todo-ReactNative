import {
  deleteTodoItemById,
  postTodoItem,
  putTodoItemById,
} from '../../utils/api';
import {Dispatch} from 'redux';
import {LOADING_FINISHED, LOADING_STARTED} from '../reducers/loading';
import {ITEMS_ADDED, ITEMS_EDITED, ITEMS_REMOVED} from '../reducers/lists';

export const addItemAPI =
  (todoItem: {description: string; todo_list_id: number}) =>
  async (dispatch: Dispatch<any>) => {
    dispatch(LOADING_STARTED());
    const res = await postTodoItem(todoItem);
    if (typeof res === 'string') {
      throw new Error(res);
    } else {
      dispatch(ITEMS_ADDED(res));
    }
    dispatch(LOADING_FINISHED());
  };

export const removeItemAPI =
  (listId: number, id: number) => async (dispatch: Dispatch<any>) => {
    dispatch(LOADING_STARTED());
    await deleteTodoItemById(id);
    dispatch(ITEMS_REMOVED({listId, id}));
    dispatch(LOADING_FINISHED());
  };

export const editItemAPI =
  (
    listId: number,
    id: number,
    todoItem: {
      description: string | undefined;
      is_done: boolean | undefined;
    },
  ) =>
  async (dispatch: Dispatch<any>) => {
    dispatch(LOADING_STARTED());
    const res = await putTodoItemById(id, todoItem);
    if (typeof res === 'string') {
      throw new Error(res);
    } else {
      dispatch(ITEMS_EDITED(res));
    }
    dispatch(LOADING_FINISHED());
  };
