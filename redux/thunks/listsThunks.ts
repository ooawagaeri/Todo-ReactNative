import {
  deleteTodoListById,
  getTodoListById,
  getTodoLists,
  postTodoList,
  putSyncData,
  putTodoListById,
} from '../../utils/api';
import {Dispatch} from 'redux';
import {LOADING_FINISHED, LOADING_STARTED} from '../reducers/loading';
import {
  LISTS_ADDED,
  LISTS_DISPLAYED,
  LISTS_EDITED,
  LISTS_REMOVED,
} from '../reducers/lists';
import store from '../configureStore';

export const addListAPI = (name: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(LOADING_STARTED());
    const res = await postTodoList({name});
    if (typeof res === 'string') {
      throw new Error(res);
    } else {
      dispatch(LISTS_ADDED(res));
    }
    dispatch(LOADING_FINISHED());
  };
};

export const displayListsAPI = () => async (dispatch: Dispatch<any>) => {
  dispatch(LOADING_STARTED());
  const res = await getTodoLists();
  if (typeof res === 'string') {
    throw new Error(res);
  } else {
    dispatch(LISTS_DISPLAYED(res));
  }
  dispatch(LOADING_FINISHED());
};

export const displayListByIdAPI =
  (listId: number) => async (dispatch: Dispatch<any>) => {
    dispatch(LOADING_STARTED());
    const res = await getTodoListById(listId);
    if (typeof res === 'string') {
      throw new Error(res);
    } else {
      dispatch(LISTS_EDITED(res));
    }
    dispatch(LOADING_FINISHED());
  };

export const removeListAPI =
  (id: number) => async (dispatch: Dispatch<any>) => {
    dispatch(LOADING_STARTED());
    await deleteTodoListById(id);
    dispatch(LISTS_REMOVED(id));
    dispatch(LOADING_FINISHED());
  };

export const editListAPI =
  (id: number, name: string) => async (dispatch: Dispatch<any>) => {
    dispatch(LOADING_STARTED());
    const res = await putTodoListById(id, {
      name,
    });
    if (typeof res === 'string') {
      throw new Error(res);
    } else {
      dispatch(LISTS_EDITED(res));
    }
    dispatch(LOADING_FINISHED());
  };

export const syncListAPI = () => async (dispatch: Dispatch<any>) => {
  dispatch(LOADING_STARTED());
  const allLists = store.getState().lists.lists;
  const res = await putSyncData(allLists);
  if (typeof res === 'string') {
    throw new Error(res);
  } else {
    dispatch(LISTS_DISPLAYED(res));
  }
  dispatch(LOADING_FINISHED());
};
