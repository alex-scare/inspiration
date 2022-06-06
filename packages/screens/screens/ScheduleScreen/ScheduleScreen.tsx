import React from 'react';
import { TabScreenProps } from '../../Navigator.types';
import { observer } from 'mobx-react-lite';
import { useGoalsStore, useScheduleStore } from '@app/core';
import { Icon, IconButton, IconSources, ListItem, View, Text } from '@app/components';
import tw from 'tailwind-react-native-classnames';
import { Pressable } from 'react-native';
import { useScheduleScreenHeader } from './ScheduleScreen.hooks';

const godMode = false;

const ScheduleScreen: React.VFC<TabScreenProps<'Schedule'>> = ({ navigation }) => {
  const { currentDayGoalIds, currentDayName, __resetAllStoreData } = useScheduleStore();
  const {
    goals: { getGoal },
    activities: { activities, addGoalActivity, removeGoalActivity },
    __resetAllGoals,
  } = useGoalsStore();

  useScheduleScreenHeader({ navigation });

  return (
    <View>
      {currentDayGoalIds.map((goalId) => {
        const goal = getGoal(goalId);
        const isActivityCompleted = currentDayName in activities[goalId];
        const [iconSource, iconName] = goal.icon.split('.');
        return (
          <ListItem
            key={goalId}
            title={goal.title}
            left={<Icon source={iconSource as IconSources} name={iconName} />}
            right={
              <IconButton
                source="Ion"
                name={isActivityCompleted ? 'checkbox-outline' : 'square-outline'}
                onPress={() => {
                  isActivityCompleted
                    ? removeGoalActivity(goalId, currentDayName)
                    : addGoalActivity(goalId, currentDayName);
                }}
              />
            }
            style={isActivityCompleted ? styles.goalCompleted : styles.goalUncompleted}
          />
        );
      })}

      {godMode && (
        <View style={tw.style('my-5')}>
          <Text variant="title">god mode</Text>
          <Pressable
            onPress={() => {
              __resetAllStoreData();
              __resetAllGoals();
            }}
          >
            <Text>reset all</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = {
  goalCompleted: tw.style('bg-green-700'),
  goalUncompleted: tw.style('bg-gray-700'),
};

const ComponentWrapper = observer(ScheduleScreen);
export { ComponentWrapper as ScheduleScreen };
