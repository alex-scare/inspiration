import { createStore } from './createStore';
import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';
import { Goal } from '@app/core';
import { dateHelper } from '../helpers/dateHelper';

interface ScheduleDay {
  goals: Record<Goal['id'], boolean>;
  countForSuccess: number;
}

type Schedule = Record<string, ScheduleDay>;

export class ScheduleStore {
  @persist('object') readonly schedule: Schedule = {};
  @persist('object') private readonly dayDraft: ScheduleDay = { goals: {}, countForSuccess: 3 };

  constructor(schedule: Schedule | null) {
    makeAutoObservable(this);
    if (schedule) this.schedule = schedule;

    const todayName = dateHelper.getDateName(new Date());
    if (!(todayName in this.schedule)) this.getDay(todayName);
  }

  get defaultDay() {
    return { ...this.dayDraft };
  }

  getDay = (day: string) => {
    const currentDay = this.schedule[day];
    if (!currentDay) this.schedule[day] = this.defaultDay;
    return this.schedule[day];
  };

  addGoal = (day: string) => (goalId: Goal['id']) => {
    this.schedule[day].goals[goalId] = false;
  };

  removeGoal = (day: string) => (goalId: Goal['id']) => {
    delete this.schedule[day].goals[goalId];
  };

  toggleGoal = (day: string) => (goalId: Goal['id']) => {
    const dailyGoals = this.schedule[day].goals;
    dailyGoals[goalId] = !dailyGoals[goalId];
  };

  setSuccessCount = (day: string) => (count: number) => {
    this.schedule[day].countForSuccess = count;
  };

  addDailyGoal = (goalId: Goal['id']) => {
    this.dayDraft.goals[goalId] = false;
  };

  removeDailyGoal = (goalId: Goal['id']) => {
    delete this.dayDraft.goals[goalId];
  };

  setDailySuccessCount = (count: number) => {
    this.dayDraft.countForSuccess = count;
  };
}

export const { useStore: useScheduleStore, Provider: ScheduleProvider } = createStore(
  new ScheduleStore(null),
  'schedule',
);
