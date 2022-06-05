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

  createEmptyActivity(goalId: Goal['id']) {
    this.activities[goalId] = {};
  }

  getGoalActivity(goalId: Goal['id']) {
    return this.activities[goalId];
  }

  getGoalActivityPower(goalId: Goal['id']) {
    return Object.keys(this.activities[goalId]).length;
  }

  isDayHaveGoalActivity(goalId: Goal['id'], day: string) {
    return day in this.getGoalActivity(goalId);
  }

  addGoalActivity(goalId: Goal['id'], day: string) {
    this.getGoalActivity(goalId)[day] = null;
  }

  removeGoalActivity(goalId: Goal['id'], day: string) {
    delete this.getGoalActivity(goalId)[day];
  }

  removeAllGoalActivity(goalId: Goal['id']) {
    delete this.activities[goalId];
  }
}
