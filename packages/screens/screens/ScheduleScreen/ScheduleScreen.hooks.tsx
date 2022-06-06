import React, { useCallback, useEffect } from 'react';
import { Icon, IconButton, Text, View } from '@app/components';
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity } from 'react-native';
import { dateHelper, useGoalsRootStore } from '@app/core';
import { TabScreenProps } from '../../Navigator.types';
import { HoldItem } from 'react-native-hold-menu';

interface UseScheduleScreenHeaderParams {
  navigation: TabScreenProps<'Schedule'>['navigation'];
}

export const useScheduleScreenHeader = ({ navigation }: UseScheduleScreenHeaderParams) => {
  const {
    schedule: { changeCurrentDayName, currentDayName, currentDay, defaultDay },
  } = useGoalsRootStore();

  const openModal = useCallback(
    (mode: 'day' | 'daily') => navigation.navigate('EditDayGoals', { mode }),
    [navigation, currentDay, defaultDay],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HoldItem
          activateOn="tap"
          items={[
            { text: 'edit day goals', onPress: () => openModal('day') },
            { text: 'edit default goals', onPress: () => openModal('daily') },
          ]}
        >
          <Icon source="Ion" name="options" style={tw.style('mr-5')} />
        </HoldItem>
      ),
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
