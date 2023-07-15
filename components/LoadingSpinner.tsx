import React from 'react';
import {useAppSelector} from '../redux/hooks';
import Spinner from 'react-native-loading-spinner-overlay';

export default function LoadingSpinner() {
  const loading = useAppSelector(state => state.loading.loading);

  return (
    <Spinner
      visible={loading}
      color={'#ff79c6'}
      overlayColor={'rgba(0, 0, 0, 0)'}
    />
  );
}
