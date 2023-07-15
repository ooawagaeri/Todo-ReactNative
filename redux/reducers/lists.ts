import {TodoList} from '../../types/types';
import {createSlice} from '@reduxjs/toolkit';

const initialList: {lists: TodoList[]} = {lists: []};

const listsSlice = createSlice({
  name: 'lists',
  initialState: initialList,
  reducers: {
    LISTS_ADDED(state, action) {
      state.lists = [...state.lists, action.payload];
    },
    LISTS_REMOVED(state, action) {
      state.lists = state.lists.filter(({id}) => id !== action.payload.id);
    },
    LISTS_DISPLAYED(state, action) {
      state.lists = [...action.payload];
    },
    LISTS_EDITED(state, action) {
      state.lists = updateState(state.lists, action.payload);
    },
  },
});

function updateState(data: TodoList[], target: TodoList): TodoList[] {
  return data.map(obj => {
    if (obj.id === target.id) {
      return target;
    }
    return obj;
  });
}

export const {LISTS_ADDED, LISTS_REMOVED, LISTS_DISPLAYED, LISTS_EDITED} =
  listsSlice.actions;

export default listsSlice.reducer;

// export function listsReducer(
//   state = initialState,
//   props: {
//     type: string;
//     payload: any;
//   },
// ) {
//   let {type, payload} = props;
//   switch (type) {
//     case Actions.LIST_ADDED:
//       return {lists: [...state.lists, payload]};
//     case Actions.LIST_REMOVED:
//       return {lists: state.lists.filter(({id}) => id !== payload.id)};
//     case Actions.LISTS_DISPLAYED:
//       return {lists: [...payload]};
//     case Actions.LISTS_EDITED:
//       return {lists: updateState(state.lists, payload)};
//     default:
//       return state;
//   }
// }
