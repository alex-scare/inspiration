import React, { useContext } from 'react';
import { create } from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StoreName = 'settings' | 'goals' | 'schedule';
const shouldRehydrate = false;

const hydrate = create({ storage: AsyncStorage, jsonify: true });

export const createStore = <TStore,>(storeValue: TStore, ASName: StoreName) => {
  const store = React.createContext(storeValue);

  const hydratedStore = hydrate(ASName, storeValue);
  hydratedStore.then(() => console.info(`${ASName} has been hydrated`));

  if (shouldRehydrate) {
    hydratedStore.rehydrate().then(() => console.info(`${ASName} has been rehydrated`));
  }

  const Provider: React.FC = ({ children }) => {
    return <store.Provider value={storeValue}>{children}</store.Provider>;
  };

  return {
    Provider: Provider,
    useStore: () => useContext(store),
  };
};
