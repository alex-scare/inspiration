import React, { useContext } from 'react';

export const createStore = <TStore,>(storeValue: TStore) => {
  const store = React.createContext(storeValue);

  const Provider: React.FC = ({ children }) => {
    return <store.Provider value={storeValue}>{children}</store.Provider>;
  };

  return {
    Provider: Provider,
    useStore: () => useContext(store),
  };
};
