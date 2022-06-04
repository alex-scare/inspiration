import React from 'react';
import { StackScreenProps } from '../Navigator.types';
import { IconButton, ListItem, View } from '@app/components';
import { observer } from 'mobx-react-lite';
import { useGoalsStore, useScheduleStore } from '@app/core';

const EditDayGoalsModal: React.VFC<StackScreenProps<'EditDayGoals'>> = () => {
  const { addGoal, removeGoal, currentDay } = useScheduleStore();
  const { goalsList } = useGoalsStore();

  return (
    <View>
      {goalsList.map((it) => (
        <ListItem
          key={it.id}
          title={it.title}
          right={
            <IconButton
              source="Ion"
              name={it.id in currentDay.goals ? 'remove' : 'add'}
              onPress={() => (it.id in currentDay.goals ? removeGoal(it.id) : addGoal(it.id))}
            />
          }
        />
      ))}
    </View>
  );
};

const ComponentWrapper = observer(EditDayGoalsModal);
export { ComponentWrapper as EditDayGoalsModal };
