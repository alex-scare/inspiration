import { makeAutoObservable } from 'mobx';
import { persist } from 'mobx-persist';
import uuid from 'react-native-uuid';

import { Goal, GoalEditableFields } from '../../models';

type GoalId = Goal['id'];
type Goals = Record<GoalId, Goal>;

export class GoalsBaseStore {
  @persist('object') goals: Goals;

  constructor(goals: Goals | null) {
    makeAutoObservable(this);

    this.goals = goals ?? {};
  }

  get goalsList() {
    return Object.values(this.goals);
  }

  getGoal = (id: GoalId) => this.goals[id];

  updateGoal = (id: GoalId, params: Partial<Omit<Goal, 'id'>>) => {
    this.goals[id] = { ...this.goals[id], ...params };
  };

  unzipGoal = (id: GoalId) => {
    this.getGoal(id).isArchived = false;
  };

  __createGoal = (params: GoalEditableFields): Goal['id'] => {
    const id = uuid.v4() as string;
    this.goals[id] = { id, isArchived: false, ...params };
    return id;
  };

  __removeGoal = (id: GoalId) => {
    delete this.goals[id];
  };

  __archiveGoal = (id: GoalId) => {
    this.getGoal(id).isArchived = true;
  };
}
