import { persist } from 'mobx-persist';
import { makeAutoObservable } from 'mobx';
import { Goal } from '@app/core';

type GoalActivities = Record<Goal['id'], Record<string, null>>;

export class GoalActivitiesStore {
  @persist('object') activities: GoalActivities;

  constructor(activities: GoalActivities | null) {
    makeAutoObservable(this);

    this.activities = activities ?? {};
  }

  createEmptyActivity = (goalId: Goal['id']) => {
    this.activities[goalId] = {};
  };

  getGoalActivity = (goalId: Goal['id']) => {
    return this.activities[goalId] ?? {};
  };

  getGoalActivityPower = (goalId: Goal['id']) => {
    return Object.keys(this.activities[goalId]).length;
  };

  addGoalActivityOnDay = (goalId: Goal['id'], day: string) => {
    this.getGoalActivity(goalId)[day] = null;
  };

  removeGoalActivityOnDay = (goalId: Goal['id'], day: string) => {
    delete this.getGoalActivity(goalId)[day];
  };

  removeAllGoalActivities = (goalId: Goal['id']) => {
    delete this.activities[goalId];
  };
}
