import * as ListActions from '../actions/listsAction';
import * as LoadingActions from '../actions/loadingAction';
import {
  deleteTodoListById,
  getTodoLists,
  postTodoList,
  putTodoListById,
} from '../../utils/api';
import {Dispatch} from 'redux';

export const addListAPI =
  (item: {name: string}) => async (dispatch: Dispatch<any>) => {
    const {name} = item;
    if (name !== '') {
      const res = await postTodoList({name});
      if (typeof res === 'string') {
        throw new Error(res);
      } else {
        dispatch(ListActions.addList(res));
      }
    }
  };

export const displayListsAPI = () => async (dispatch: Dispatch<any>) => {
  dispatch(LoadingActions.loadingStart());
  const res = await getTodoLists();
  if (typeof res === 'string') {
    throw new Error(res);
  } else {
    dispatch(ListActions.listDisplay(res));
  }
  dispatch(LoadingActions.loadingEnd());
};

export const removeListAPI =
  (id: number) => async (dispatch: Dispatch<any>) => {
    const res = await deleteTodoListById(id);
    console.log(res);
    dispatch(ListActions.removeList(id));
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
        dispatch(ListActions.editList(res));
      }
    }
  };
