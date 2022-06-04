import React, { useEffect } from 'react';
import { StackScreenProps } from '../Navigator.types';
import { Icon, ListItem, View } from '@app/components';
import { observer } from 'mobx-react-lite';
import { useGoalsStore } from '@app/core';
import { Pressable } from 'react-native';

const EditDayGoalsModal: React.VFC<StackScreenProps<'EditDayGoals'>> = ({
  navigation,
  route: {
    params: { add, remove, goals, mode },
  },
}) => {
  const { goalsList } = useGoalsStore();

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
