import { createStore } from './createStore';
import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';
import uuid from 'react-native-uuid';

interface Goal {
  id: string;
  title: string;
  power: 0;
  // todo add icon and color
  // icon: string;
  // color: string;
}

type Goals = Record<Goal['id'], Goal>;

export class GoalsStore {
  @persist('list') goals: Goals = {};

  constructor(goals: Goals | null) {
    makeAutoObservable(this);

    if (goals) this.goals = goals;
  }

  get goalsList () {
    return Object.values(this.goals);
  }

  getGoal = (id: Goal['id']) => this.goals[id];

  createGoal = (params: Omit<Goal, 'id' | 'power'>) => {
    const id = uuid.v4() as string;
    this.goals[id] = { id, power: 0, ...params};
  }

  updateGoal = (id: Goal['id'], params: Omit<Goal, 'id'>) => {
    this.goals[id] = { ...this.goals[id], ...params};
  }

  removeGoal = (id: Goal['id']) => {
    delete this.goals[id];
  }

}

export const { useStore: useGoalsStore, Provider: GoalsProvider } = createStore(
  new GoalsStore(null),
  'goals',
);
