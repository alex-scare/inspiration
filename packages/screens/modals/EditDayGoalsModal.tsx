import React, { useEffect, useMemo } from 'react';
import { StackScreenProps } from '../Navigator.types';
import { Icon, ListWrapper, SelectableListItem } from '@app/components';
import { observer } from 'mobx-react-lite';
import { useGoalsRootStore } from '@app/core';

const EditDayGoalsModal: React.VFC<StackScreenProps<'EditDayGoals'>> = ({
  navigation,
  route: {
    params: { mode },
  },
}) => {
  const {
    goals: { goalsList },
    schedule: { currentDay, addDailyGoal, removeDailyGoal, defaultDay },
    addGoalOnDay,
    removeGoalOnDay,
  } = useGoalsRootStore();

  const { add, remove, goals } = useMemo(() => {
    const variants = {
      day: { add: addGoalOnDay, remove: removeGoalOnDay, goals: currentDay.goals },
      daily: { add: addDailyGoal, remove: removeDailyGoal, goals: defaultDay.goals },
    };
    return variants[mode];
  }, [mode, defaultDay, currentDay]);

  useEffect(() => {
    const variants = { day: 'day goals', daily: 'default daily goals' };
    navigation.setOptions({ title: variants[mode] });
  }, [mode]);

  return (
    <ListWrapper>
      {goalsList.map((it) => {
        const selected = it.id in goals;
        return (
          <SelectableListItem
            key={it.id}
            selected={selected}
            onSelect={() => (selected ? remove(it.id) : add(it.id))}
            title={it.title}
            right={<Icon source="Ion" name={selected ? 'remove' : 'add'} />}
          />
        );
      })}
    </ListWrapper>
  );
};

const ComponentWrapper = observer(EditDayGoalsModal);
export { ComponentWrapper as EditDayGoalsModal };
