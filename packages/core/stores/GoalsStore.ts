import { createStore } from './createStore';
import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';
import uuid from 'react-native-uuid';
import { Goal } from '../models';

type GoalId = Goal['id'];
type Goals = Record<GoalId, Goal>;

export class GoalsStore {
  // todo fix persist
  @persist('list') goals: Goals = {};

  constructor(goals: Goals | null) {
    makeAutoObservable(this);

    if (goals) this.goals = goals;
  }

  get goalsList() {
    return Object.values(this.goals);
  }

  getGoal = (id: GoalId) => this.goals[id];

  createGoal = (params: Omit<Goal, 'id' | 'power'>) => {
    const id = uuid.v4() as string;
    this.goals[id] = { id, power: 0, ...params };
  };

  updateGoal = (id: GoalId, params: Partial<Omit<Goal, 'id'>>) => {
    this.goals[id] = { ...this.goals[id], ...params };
  };

  removeGoal = (id: GoalId) => {
    delete this.goals[id];
  };
}

export const { useStore: useGoalsStore, Provider: GoalsProvider } = createStore(
  new GoalsStore(null),
  'goals',
);
