import React, { useEffect, useMemo } from 'react';
import { StackScreenProps } from '../Navigator.types';
import { Icon, ListItem, ListWrapper, View } from '@app/components';
import { observer } from 'mobx-react-lite';
import { useGoalsRootStore } from '@app/core';
import { Pressable } from 'react-native';

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
      {goalsList.map((it) => (
        <Pressable key={it.id} onPress={() => (it.id in goals ? remove(it.id) : add(it.id))}>
          <ListItem
            title={it.title}
            right={<Icon source="Ion" name={it.id in goals ? 'remove' : 'add'} />}
          />
        </Pressable>
      ))}
    </ListWrapper>
  );
};

const ComponentWrapper = observer(EditDayGoalsModal);
export { ComponentWrapper as EditDayGoalsModal };
