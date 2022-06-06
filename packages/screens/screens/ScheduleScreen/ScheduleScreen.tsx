import React from 'react';
import { TabScreenProps } from '../../Navigator.types';
import { observer } from 'mobx-react-lite';
import { useGoalsRootStore } from '@app/core';
import { Icon, IconSources, ListWrapper, SelectableListItem, Text, View } from '@app/components';
import tw from 'tailwind-react-native-classnames';
import { Pressable } from 'react-native';
import { useScheduleScreenHeader } from './ScheduleScreen.hooks';

const godMode = false;

const ScheduleScreen: React.VFC<TabScreenProps<'Schedule'>> = ({ navigation }) => {
  const {
    goals: { getGoal },
    activities: { activities, addGoalActivityOnDay, removeGoalActivityOnDay },
    schedule: { currentDayGoalIds, currentDayName, __resetAllStoreData },
    __resetAllGoals,
  } = useGoalsRootStore();

  useScheduleScreenHeader({ navigation });

  return (
    <ListWrapper>
      {currentDayGoalIds.map((goalId) => {
        const goal = getGoal(goalId);
        const isActivityCompleted = currentDayName in activities[goalId];
        const [iconSource, iconName] = goal.icon.split('.');
        return (
          <SelectableListItem
            key={goalId}
            onSelect={() => {
              isActivityCompleted
                ? removeGoalActivityOnDay(goalId, currentDayName)
                : addGoalActivityOnDay(goalId, currentDayName);
            }}
            selected={isActivityCompleted}
            title={goal.title}
            left={<Icon source={iconSource as IconSources} name={iconName} />}
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
    </ListWrapper>
  );
};

const ComponentWrapper = observer(ScheduleScreen);
export { ComponentWrapper as ScheduleScreen };
