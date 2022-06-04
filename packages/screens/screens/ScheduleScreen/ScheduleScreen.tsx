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
  const { currentDayGoalIds, toggleGoal, currentDay, resetAllStoreData } = useScheduleStore();
  const { getGoal, incrementPower, decrementPower, resetGoalsPower } = useGoalsStore();

  useScheduleScreenHeader({ navigation });

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
                name={currentDay.goals[goalId] ? 'checkbox-outline' : 'square-outline'}
                onPress={() => {
                  toggleGoal(goalId);
                  currentDay.goals[goalId] ? incrementPower(goalId) : decrementPower(goalId);
                }}
              />
            }
            style={currentDay.goals[goalId] ? styles.goalCompleted : styles.goalUncompleted}
          />
        );
      })}

      {godMode && (
        <View style={tw.style('my-5')}>
          <Text variant="title">god mode</Text>
          <Pressable
            onPress={() => {
              resetAllStoreData();
              resetGoalsPower();
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
