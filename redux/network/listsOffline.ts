import {
  addListAPI,
  displayListsAPI,
  editListAPI,
  removeListAPI,
} from '../thunks/listsThunks';
import {isOffline, queueDispatch} from './offline';
import {TodoList} from '../../types/types';
import {Dispatch} from 'redux';
import store from '../configureStore';
import {
  LISTS_ADDED,
  LISTS_DISPLAYED,
  LISTS_EDITED,
  LISTS_REMOVED,
} from '../reducers/lists';

export const addListOfflineAPI = (name: string) => {
  return async (dispatch: Dispatch<any>) => {
    if (await isOffline()) {
      const state = store.getState();
      const newList: TodoList = {
        id: state.lists.lists[0].id + 1,
        todos: [],
        name,
        created_at: new Date(),
        updated_at: new Date(),
      };
      dispatch(LISTS_ADDED(newList));
      queueDispatch(() => dispatch(addListAPI(name)));
    } else {
      dispatch(addListAPI(name));
    }
  };
};

export const displayListsOfflineAPI = () => async (dispatch: Dispatch<any>) => {
  if (await isOffline()) {
    const state = store.getState();
    dispatch(LISTS_DISPLAYED(state.lists.lists));
  } else {
    dispatch(displayListsAPI());
  }
};

export const removeListOfflineAPI =
  (id: number) => async (dispatch: Dispatch<any>) => {
    if (await isOffline()) {
      dispatch(LISTS_REMOVED(id));
      queueDispatch(() => dispatch(removeListAPI(id)));
    } else {
      dispatch(removeListAPI(id));
    }
  };

export const editListOfflineAPI =
  (id: number, editName: string) => async (dispatch: Dispatch<any>) => {
    if (await isOffline()) {
      const state = store.getState();
      const targetList = state.lists.lists.filter(list => list.id === id)[0];
      const editedList: TodoList = {
        id: targetList.id,
        todos: targetList.todos,
        name: editName,
        created_at: targetList.created_at,
        updated_at: new Date(),
      };
      dispatch(LISTS_EDITED(editedList));
      queueDispatch(() => dispatch(editListAPI(id, editName)));
    } else {
      dispatch(editListAPI(id, editName));
    }
  };
