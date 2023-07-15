import {TodoItem} from '../../types/types';
import {createSlice} from '@reduxjs/toolkit';

const initialList: {items: TodoItem[]} = {items: []};

const itemsSlice = createSlice({
  name: 'items',
  initialState: initialList,
  reducers: {
    ITEMS_ADDED(state, action) {
      state.items = [action.payload, ...state.items];
    },
    ITEMS_REMOVED(state, action) {
      state.items = state.items.filter(list => list.id !== action.payload);
    },
    ITEMS_EDITED(state, action) {
      state.items = [...action.payload];
    },
    ITEMS_DISPLAYED(state, action) {
      state.items = updateState(state.items, action.payload);
    },
  },
});

function updateState(data: TodoItem[], target: TodoItem): TodoItem[] {
  return data.map(obj => {
    if (obj.id === target.id) {
      return target;
    }
    return obj;
  });
}

export const {ITEMS_ADDED, ITEMS_REMOVED, ITEMS_DISPLAYED, ITEMS_EDITED} =
  itemsSlice.actions;

export default itemsSlice.reducer;
