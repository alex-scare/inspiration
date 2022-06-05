import { createStore } from '../createStore';
import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';
import { GoalsBaseStore } from './GoalsBaseStore';
import { GoalActivitiesStore } from './GoalActivitiesStore';
import { Goal, GoalEditableFields } from '../../models';

export class GoalsRootStore {
  @persist('object', GoalsBaseStore) readonly goals = new GoalsBaseStore(null);
  @persist('object', GoalActivitiesStore) readonly activities = new GoalActivitiesStore(null);

  constructor() {
    makeAutoObservable(this);
  }

  createGoal(params: GoalEditableFields) {
    const goalId = this.goals.__createGoal(params);
    this.activities.createEmptyActivity(goalId);
  }

  archiveGoal(id: Goal['id']) {
    this.goals.__archiveGoal(id);
  }

  removeGoal(id: Goal['id']) {
    this.goals.__removeGoal(id);
    this.activities.removeAllGoalActivity(id);
  }
}

export const { useStore: useGoalsStore, Provider: GoalsProvider } = createStore(
  new GoalsRootStore(),
  'goals',
);
