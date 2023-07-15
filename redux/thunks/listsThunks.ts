import {
  deleteTodoListById,
  getTodoLists,
  postTodoList,
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

export const addListAPI = (name: string) => async (dispatch: Dispatch<any>) => {
  const res = await postTodoList({name});
  if (typeof res === 'string') {
    throw new Error(res);
  } else {
    dispatch(LISTS_ADDED(res));
  }
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

export const removeListAPI =
  (id: number) => async (dispatch: Dispatch<any>) => {
    const res = await deleteTodoListById(id);
    console.log(res);
    dispatch(LISTS_REMOVED(id));
  };

export const editListAPI =
  (id: number, name: string) => async (dispatch: Dispatch<any>) => {
    if (name !== '') {
      const res = await putTodoListById(id, {
        name,
      });
      if (typeof res === 'string') {
        throw new Error(res);
      } else {
        dispatch(LISTS_EDITED(res));
      }
    }
  };
