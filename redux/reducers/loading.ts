import {createSlice} from '@reduxjs/toolkit';

const initialLoading = {loading: false};

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
  },
});

export const {LOADING_STARTED, LOADING_FINISHED} = loadingSlice.actions;

export default loadingSlice.reducer;
