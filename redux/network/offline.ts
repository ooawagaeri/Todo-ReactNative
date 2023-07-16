import NetInfo from '@react-native-community/netinfo';

let offlineHistory = false;

/**
 * Checks if network connection is offline.
 */
export const isOffline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return !state.isConnected;
};

export const setOfflineHistory = (value: boolean) => {
  offlineHistory = value;
};

/**
 * Checks if an offline API request was made.
 */
export const existOfflineHistory = (): boolean => {
  return offlineHistory;
};
