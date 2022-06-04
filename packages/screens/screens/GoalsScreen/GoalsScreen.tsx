import React from 'react';

import { View } from '@app/components';
import { useGoalsStore } from '@app/core';
import tw from 'tailwind-react-native-classnames';
import { ScrollView } from 'react-native';
import { TabScreenProps } from '../../Navigator.types';
import { observer } from 'mobx-react-lite';
import { GoalItem } from './GoalItem';

const GoalsScreen = (props: TabScreenProps<'Goals'>) => {
  const { goalsList } = useGoalsStore();

  return (
    <View style={styles.view}>
      <ScrollView style={styles.container}>
        <View style={styles.list}>
          {goalsList.map((it, i) => (
            <GoalItem key={i} goal={it} divider={i > 0} {...props} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  view: tw.style('flex-1'),
  container: tw.style('flex'),
  list: tw.style('rounded-md m-3 overflow-hidden'),
};

const Wrapper = observer(GoalsScreen);
export { Wrapper as GoalsScreen };
