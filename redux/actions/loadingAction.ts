import {LOADING_FINISHED, LOADING_STARTED} from '../reducers/loading';

export const loadingStart = () => ({
  type: LOADING_STARTED,
});

export const loadingEnd = () => ({
  type: LOADING_FINISHED,
});
