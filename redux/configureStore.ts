import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import listsReducer from './reducers/lists';
import loadingReducer from './reducers/loading';

// create the store
const store = configureStore({
  reducer: {
    lists: listsReducer,
    loading: loadingReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
