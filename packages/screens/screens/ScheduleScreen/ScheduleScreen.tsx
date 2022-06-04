import React, { useEffect } from 'react';
import { TabScreenProps } from '../../Navigator.types';
import { observer } from 'mobx-react-lite';
import { useGoalsStore, useScheduleStore } from '@app/core';
import { Icon, IconButton, IconSources, ListItem, View, Text } from '@app/components';
import tw from 'tailwind-react-native-classnames';
import { dateHelper } from '../../../core/helpers/dateHelper';
import { Pressable, TouchableOpacity } from 'react-native';

const godMode = false;

const ScheduleScreen: React.VFC<TabScreenProps<'Schedule'>> = ({ navigation }) => {
  const {
    currentDayGoalIds,
    toggleGoal,
    currentDayName,
    currentDay,
    changeCurrentDayName,
    resetAllStoreData,
  } = useScheduleStore();
  const { getGoal, incrementPower, decrementPower, resetGoalsPower } = useGoalsStore();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw.style('flex flex-nowrap flex-row items-center')}>
          <IconButton
            source="Ion"
            name="chevron-back"
            onPress={() => changeCurrentDayName('prev')}
          />
          <TouchableOpacity onLongPress={() => changeCurrentDayName(new Date())}>
            <Text style={tw.style('mx-2')}>{dateHelper.getDateNameLabel(currentDayName)}</Text>
          </TouchableOpacity>
          <IconButton
            source="Ion"
            name="chevron-forward"
            onPress={() => changeCurrentDayName('next')}
          />
        </View>
      ),
    });
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
