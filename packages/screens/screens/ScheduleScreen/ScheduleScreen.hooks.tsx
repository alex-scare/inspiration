import React, { useEffect } from 'react';
import { IconButton, Text, View } from '@app/components';
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity } from 'react-native';
import { dateHelper } from '../../../core/helpers/dateHelper';
import { TabScreenProps } from '../../Navigator.types';
import { useScheduleStore } from '@app/core';

interface UseScheduleScreenHeaderParams {
  navigation: TabScreenProps<'Schedule'>['navigation'];
}

export const useScheduleScreenHeader = ({ navigation }: UseScheduleScreenHeaderParams) => {
  const { changeCurrentDayName, currentDayName } = useScheduleStore();

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
};
