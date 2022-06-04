import React, { useCallback, useEffect } from 'react';
import { IconButton, Text, View } from '@app/components';
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity } from 'react-native';
import { dateHelper, useScheduleStore } from '@app/core';
import { TabScreenProps } from '../../Navigator.types';

interface UseScheduleScreenHeaderParams {
  navigation: TabScreenProps<'Schedule'>['navigation'];
}

export const useScheduleScreenHeader = ({ navigation }: UseScheduleScreenHeaderParams) => {
  const {
    changeCurrentDayName,
    currentDayName,
    currentDay,
    addGoal,
    removeGoal,
    addDailyGoal,
    removeDailyGoal,
    defaultDay,
  } = useScheduleStore();

  const openModal = useCallback(
    (mode: 'day' | 'daily') => {
      const variants = {
        day: { add: addGoal, remove: removeGoal, goals: currentDay.goals },
        daily: { add: addDailyGoal, remove: removeDailyGoal, goals: defaultDay.goals },
      };
      navigation.navigate('EditDayGoals', { ...variants[mode], mode });
    },
    [navigation, currentDay, defaultDay],
  );

  useEffect(() => {
    navigation.setOptions({
      // headerRight: () => (
      //   <HoldItem
      //     activateOn="tap"
      //     items={[
      //       { text: 'edit day goals', onPress: () => openModal('day') },
      //       { text: 'edit default goals', onPress: () => openModal('daily') },
      //     ]}
      //   >
      //     <Icon source="Ion" name="options" />
      //   </HoldItem>
      // ),
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
};
