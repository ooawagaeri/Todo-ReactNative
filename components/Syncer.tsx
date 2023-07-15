import React, {useEffect} from 'react';
import {useAppDispatch} from '../redux/hooks';
import {useNetInfo} from '@react-native-community/netinfo';
import {existOfflineDispatches, syncDispatches} from '../redux/network/offline';
import {displayListsAPI} from '../redux/thunks/listsThunks';

export default function Syncer() {
  const netInfo = useNetInfo();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isConnected = netInfo.isConnected;
    if (isConnected === null) {
      return;
    }
    // Push data to server
    if (isConnected && existOfflineDispatches()) {
      dispatch(displayListsAPI()); // Reset state to server last-known
      syncDispatches(); // Update last-known with offline data
    }
  }, [dispatch, netInfo]);

  return <></>;
}
