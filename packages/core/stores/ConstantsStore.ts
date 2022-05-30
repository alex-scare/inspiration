import { createStore } from './createStore';
import { makeAutoObservable } from 'mobx';

// example store
interface Constants {
  colorTheme: 'light' | 'dark';
}

class ConstantsStore {
  colorTheme: Constants['colorTheme'] = 'dark';

  constructor() {
    makeAutoObservable(this);
  }
}

const store = new ConstantsStore();
export const { useStore: useConstantsStore, Provider: ConstantsProvider } = createStore(store);
