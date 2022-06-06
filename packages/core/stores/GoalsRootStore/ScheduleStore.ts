import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';
import { Goal } from '@app/core';
import { dateHelper } from '../../helpers';

interface ScheduleDay {
  goals: Record<Goal['id'], null>;
  countForSuccess: number;
}

type Schedule = Record<string, ScheduleDay>;

export class ScheduleStore {
  @persist currentDayName: string;
  @persist('object') schedule: Schedule = {};
  @persist('object') private readonly dayDraft: ScheduleDay = { goals: {}, countForSuccess: 3 };

  constructor(schedule: Schedule | null) {
    makeAutoObservable(this, {});
    if (schedule) this.schedule = schedule;

    this.currentDayName = dateHelper.getDateName(new Date());
    if (!(this.currentDayName in this.schedule)) this.getDay(this.currentDayName);
  }

  get defaultDay(): ScheduleDay {
    return { ...this.dayDraft, goals: { ...this.dayDraft.goals } };
  }

  get currentDay() {
    return this.getDay(this.currentDayName);
  }

  get currentDayGoalIds() {
    return Object.keys(this.currentDay.goals);
  }

  getDay = (day: string) => {
    const currentDay = this.schedule[day];
    if (!currentDay) {
      this.schedule[day] = { ...this.defaultDay };
    }
    return this.schedule[day];
  };

  __addDayGoal = (goalId: Goal['id'], dayName: string) => {
    this.getDay(dayName).goals[goalId] = null;
  };

  __removeDayGoal = (goalId: Goal['id'], dayName: string) => {
    delete this.getDay(dayName).goals[goalId];
  };

  setSuccessCount = (count: number) => {
    this.currentDay.countForSuccess = count;
  };

  addDailyGoal = (goalId: Goal['id']) => {
    this.dayDraft.goals[goalId] = null;
  };

  removeDailyGoal = (goalId: Goal['id']) => {
    delete this.dayDraft.goals[goalId];
  };

  setDailySuccessCount = (count: number) => {
    this.dayDraft.countForSuccess = count;
  };

  changeCurrentDayName = (date: 'next' | 'prev' | Date) => {
    switch (date) {
      case 'prev':
        this.currentDayName = dateHelper.getPrevDateName(this.currentDayName);
        break;
      case 'next':
        this.currentDayName = dateHelper.getNextDateName(this.currentDayName);
        break;
      default:
        this.currentDayName = dateHelper.getDateName(date);
    }
  };

  // god mode methods

  __resetAllStoreData = () => {
    this.schedule = {};
    this.dayDraft.goals = {};
  };
}
