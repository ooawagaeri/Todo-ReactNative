import {createSlice} from '@reduxjs/toolkit';

const initialLoading = {loading: false, syncing: false};

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoading,
  reducers: {
    LOADING_STARTED(state) {
      state.loading = true;
    },
    LOADING_FINISHED(state) {
      state.loading = false;
    },
    SYNCING_STARTED(state) {
      state.syncing = true;
    },
    SYNCING_FINISHED(state) {
      state.syncing = false;
    },
  },
});

export const {
  LOADING_STARTED,
  LOADING_FINISHED,
  SYNCING_STARTED,
  SYNCING_FINISHED,
} = loadingSlice.actions;

export default loadingSlice.reducer;
