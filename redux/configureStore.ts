import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import listsReducer from './reducers/lists';
import loadingReducer from './reducers/loading';
import {TodoList} from '../types/types';

export interface AppState {
  lists: {lists: TodoList[]};
  loading: {loading: boolean; syncing: boolean};
}

const store = configureStore({
  reducer: {
    lists: listsReducer,
    loading: loadingReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
