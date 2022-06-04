import { createStore } from './createStore';
import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';
import uuid from 'react-native-uuid';
import { Goal } from '../models';

type GoalId = Goal['id'];
type Goals = Record<GoalId, Goal>;

export class GoalsStore {
  @persist('object') goals: Goals = {};

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

  incrementPower = (id: GoalId) => {
    this.goals[id].power = this.goals[id].power + 1;
  };

  decrementPower = (id: GoalId) => {
    this.goals[id].power = this.goals[id].power - 1;
  };

  resetGoalsPower = () => {
    for (const key in this.goals) {
      this.goals[key].power = 0;
    }
  };
}

export const { useStore: useGoalsStore, Provider: GoalsProvider } = createStore(
  new GoalsStore(null),
  'goals',
);
