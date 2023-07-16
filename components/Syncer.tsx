import React, {useEffect, useState} from 'react';
import {useAppDispatch} from '../redux/hooks';
import {useNetInfo} from '@react-native-community/netinfo';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import {syncListAPI} from '../redux/thunks/listsThunks';
import {existOfflineHistory, setOfflineHistory} from '../redux/network/offline';

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
    if (isConnected && existOfflineHistory()) {
      setOfflineHistory(false);
      dispatch(syncListAPI()).then();
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
