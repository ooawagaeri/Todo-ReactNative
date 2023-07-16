import {TodoItem, TodoList} from '../../types/types';
import {createSlice} from '@reduxjs/toolkit';

const initialList: {lists: TodoList[]} = {lists: []};

const listsSlice = createSlice({
  name: 'lists',
  initialState: initialList,
  reducers: {
    LISTS_ADDED(state, action) {
      state.lists = [action.payload, ...state.lists];
    },
    LISTS_REMOVED(state, action) {
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },
    LISTS_DISPLAYED(state, action) {
      state.lists = [...action.payload];
    },
    LISTS_EDITED(state, action) {
      state.lists = editListState(state.lists, action.payload);
    },
    // Todo Items
    ITEMS_ADDED(state, action) {
      state.lists = addItemState(state.lists, action.payload);
    },
    ITEMS_REMOVED(state, action) {
      state.lists = removeItemState(state.lists, action.payload);
    },
    ITEMS_EDITED(state, action) {
      state.lists = editItemState(state.lists, action.payload);
    },
  },
});

/**
 * --------------- Todo List State Functions ---------------
 */
function editListState(data: TodoList[], target: TodoList): TodoList[] {
  return data.map(list => {
    if (list.id === target.id) {
      return target;
    }
    return list;
  });
}

/**
 * --------------- Todo Item State Functions ---------------
 */
function retrieveList(data: TodoList[], listId: number | undefined) {
  const targetList = data.filter(list => list.id === listId);
  if (!targetList.length) {
    throw new Error('No such list');
  }
  return targetList[0];
}

function addItemState(data: TodoList[], item: TodoItem): TodoList[] {
  const targetList = retrieveList(data, item.todo_list_id);
  targetList.todos = [...targetList.todos, item];
  return editListState(data, targetList);
}

function removeItemState(
  data: TodoList[],
  target: {listId: number; id: number},
): TodoList[] {
  const targetList = retrieveList(data, target.listId);
  targetList.todos = targetList.todos.filter(item => item.id !== target.id);
  return editListState(data, targetList);
}

function editItemState(data: TodoList[], target: TodoItem): TodoList[] {
  const targetList = retrieveList(data, target.todo_list_id);
  targetList.todos = targetList.todos.map(item => {
    if (item.id === target.id) {
      return target;
    }
    return item;
  });
  return editListState(data, targetList);
}

export const {LISTS_ADDED, LISTS_REMOVED, LISTS_DISPLAYED, LISTS_EDITED} =
  listsSlice.actions;

export const {ITEMS_ADDED, ITEMS_REMOVED, ITEMS_EDITED} = listsSlice.actions;

export default listsSlice.reducer;
