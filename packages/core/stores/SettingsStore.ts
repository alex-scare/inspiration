import { createStore } from './createStore';
import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';

interface Settings {
  counter: number;
}

export class SettingsStore {
  @persist counter: Settings['counter'] = 0;

  constructor() {
    makeAutoObservable(this);
  }

  incrementCounter = () => (this.counter += 1);
}

export const { useStore: useSettingsStore, Provider: SettingsProvider } = createStore(
  new SettingsStore(),
  'settings',
);
