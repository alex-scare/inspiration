import React, { useEffect, useMemo } from 'react';
import { StackScreenProps } from '../Navigator.types';
import { Icon, ListItem, View } from '@app/components';
import { observer } from 'mobx-react-lite';
import { useGoalsStore, useScheduleStore } from '@app/core';
import { Pressable } from 'react-native';

const EditDayGoalsModal: React.VFC<StackScreenProps<'EditDayGoals'>> = ({
  navigation,
  route: {
    params: { mode },
  },
}) => {
  const { currentDay, addGoal, removeGoal, addDailyGoal, removeDailyGoal, defaultDay } =
    useScheduleStore();
  const { goalsList } = useGoalsStore();

  const { add, remove, goals } = useMemo(() => {
    const variants = {
      day: { add: addGoal, remove: removeGoal, goals: currentDay.goals },
      daily: { add: addDailyGoal, remove: removeDailyGoal, goals: defaultDay.goals },
    };
    return variants[mode];
  }, [mode, defaultDay, currentDay]);

  useEffect(() => {
    const variants = { day: 'day goals', daily: 'default daily goals' };
    navigation.setOptions({ title: variants[mode] });
  }, [mode]);

  return (
    <View>
      {goalsList.map((it) => (
        <Pressable key={it.id} onPress={() => (it.id in goals ? remove(it.id) : add(it.id))}>
          <ListItem
            title={it.title}
            right={<Icon source="Ion" name={it.id in goals ? 'remove' : 'add'} />}
          />
        </Pressable>
      ))}
    </View>
  );
};

const ComponentWrapper = observer(EditDayGoalsModal);
export { ComponentWrapper as EditDayGoalsModal };
