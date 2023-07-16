import NetInfo from '@react-native-community/netinfo';

let offlineHistory = false;

export const isOffline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return !state.isConnected;
};

export const setOfflineHistory = (value: boolean) => {
  offlineHistory = value;
};

export const existOfflineHistory = (): boolean => {
  return offlineHistory;
};
