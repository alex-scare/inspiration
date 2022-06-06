import { createStore } from '../createStore';
import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';
import { GoalsBaseStore } from './GoalsBaseStore';
import { GoalActivitiesStore } from './GoalActivitiesStore';
import { Goal, GoalEditableFields } from '../../models';
import { ScheduleStore } from './ScheduleStore';

export class GoalsRootStore {
  @persist('object', GoalsBaseStore) readonly goals = new GoalsBaseStore(null);
  @persist('object', GoalActivitiesStore) readonly activities = new GoalActivitiesStore(null);
  @persist('object', ScheduleStore) readonly schedule = new ScheduleStore(null);

  constructor() {
    makeAutoObservable(this);
  }

  // goal methods

  createGoal = (params: GoalEditableFields) => {
    const goalId = this.goals.__createGoal(params);
    this.activities.createEmptyActivity(goalId);
  };

  archiveGoal = (id: Goal['id']) => {
    this.goals.__archiveGoal(id);
  };

  removeGoal = (id: Goal['id']) => {
    this.goals.__removeGoal(id);
    this.activities.removeAllGoalActivities(id);
  };

  // schedule methods

  addGoalOnDay = (goalId: string, dayName = this.schedule.currentDayName) => {
    this.schedule.__addDayGoal(goalId, dayName);
  };

  removeGoalOnDay = (goalId: string, dayName = this.schedule.currentDayName) => {
    this.schedule.__removeDayGoal(goalId, dayName);
    this.activities.removeGoalActivityOnDay(goalId, dayName);
  };

  // god mode methods

  __resetAllGoals = () => {
    this.goals.goals = {};
    this.activities.activities = {};
  };
}

export const { useStore: useGoalsRootStore, Provider: GoalsProvider } = createStore(
  new GoalsRootStore(),
  'goals',
);
