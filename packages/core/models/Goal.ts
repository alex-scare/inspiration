import { IconFullName } from '@app/components';

export interface GoalEditableFields {
  title: string;
  icon: IconFullName;
}

export interface Goal extends GoalEditableFields {
  id: string;
  isArchived: boolean;

  // todo add color
  // color: string;
}
