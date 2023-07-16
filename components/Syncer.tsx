import React, {useEffect, useState} from 'react';
import {useAppDispatch} from '../redux/hooks';
import {useNetInfo} from '@react-native-community/netinfo';
import {existOfflineDispatches, syncDispatches} from '../redux/network/offline';
import {displayListsAPI} from '../redux/thunks/listsThunks';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';

export default function Syncer() {
  const netInfo = useNetInfo();
  const dispatch = useAppDispatch();
  const [isOnline, setIsOnline] = useState(true);
  const iconColors = ['#ff5555', '#50fa7b'];

  useEffect(() => {
    const isConnected = netInfo.isConnected;
    if (isConnected === null) {
      return;
    }
    setIsOnline(isConnected);
    // Push data to server
    if (isConnected && existOfflineDispatches()) {
      dispatch(displayListsAPI()); // Reset state to server last-known
      syncDispatches(); // Update last-known with offline data
    }
  }, [dispatch, netInfo]);

  return (
    <ComponentContainer>
      <AntDesign name={'wifi'} color={iconColors[Number(isOnline)]} size={20} />
    </ComponentContainer>
  );
}

const ComponentContainer = styled(View)`
  padding-right: 20px;
`;
