import NetInfo from '@react-native-community/netinfo';

let offlineDispatches: (() => void)[] = [];

export const isOffline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return !state.isConnected;
};

export const queueDispatch = (caller: () => void) => {
  offlineDispatches.push(caller);
};

export const syncDispatches = () => {
  for (const patches of offlineDispatches) {
    patches();
  }
  offlineDispatches = [];
};

export const existOfflineDispatches = (): boolean => {
  return offlineDispatches.length !== 0;
};
