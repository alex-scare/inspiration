import React, { useContext } from 'react';
import { create } from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StoreName = 'settings' | 'goals';

const hydrate = create({ storage: AsyncStorage, jsonify: true });

export const createStore = <TStore,>(storeValue: TStore, ASName: StoreName) => {
  const store = React.createContext(storeValue);

  hydrate(ASName, storeValue).then(() => console.info(`${ASName} has been hydrated`));

  const Provider: React.FC = ({ children }) => {
    return <store.Provider value={storeValue}>{children}</store.Provider>;
  };

  return {
    Provider: Provider,
    useStore: () => useContext(store),
  };
};
