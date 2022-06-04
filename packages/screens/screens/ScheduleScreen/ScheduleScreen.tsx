import React, { useEffect } from 'react';
import { TabScreenProps } from '../../Navigator.types';
import { observer } from 'mobx-react-lite';
import { useGoalsStore, useScheduleStore } from '@app/core';
import { Icon, IconButton, IconSources, ListItem, View } from '@app/components';
import tw from 'tailwind-react-native-classnames';

const ScheduleScreen: React.VFC<TabScreenProps<'Schedule'>> = ({ navigation }) => {
  const { currentDayGoalIds, toggleGoal, currentDayName, currentDay } = useScheduleStore();
  const { getGoal, incrementPower, decrementPower } = useGoalsStore();

  useEffect(() => {
    navigation.setOptions({ title: currentDayName });
  }, [currentDayName]);

  return (
    <View>
      {currentDayGoalIds.map((goalId) => {
        const goal = getGoal(goalId);
        const [iconSource, iconName] = goal.icon.split('.');
        return (
          <ListItem
            key={goalId}
            title={goal.title}
            left={<Icon source={iconSource as IconSources} name={iconName} />}
            right={
              <IconButton
                source="Ion"
                name={currentDay.goals[goalId] ? 'close' : 'checkmark'}
                onPress={() => {
                  toggleGoal(currentDayName)(goalId);
                  currentDay.goals[goalId] ? decrementPower(goalId) : incrementPower(goalId);
                }}
              />
            }
            style={currentDay.goals[goalId] ? styles.goalCompleted : styles.goalUncompleted}
          />
        );
      })}
    </View>
  );
};

const styles = {
  goalCompleted: tw.style('bg-green-700'),
  goalUncompleted: tw.style('bg-gray-700'),
};

const ComponentWrapper = observer(ScheduleScreen);
export { ComponentWrapper as ScheduleScreen };
