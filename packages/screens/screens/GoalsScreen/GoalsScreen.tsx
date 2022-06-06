import React from 'react';

import { ListWrapper, View } from '@app/components';
import { useGoalsRootStore } from '@app/core';
import tw from 'tailwind-react-native-classnames';
import { TabScreenProps } from '../../Navigator.types';
import { observer } from 'mobx-react-lite';
import { GoalItem } from './GoalItem';

const GoalsScreen = (props: TabScreenProps<'Goals'>) => {
  const {
    goals: { goalsList },
    activities: { getGoalActivityPower },
  } = useGoalsRootStore();

  return (
    <View style={styles.view}>
      <ListWrapper>
        {goalsList.map((it, i) => (
          <GoalItem
            key={i}
            divider={i > 0}
            power={getGoalActivityPower(it.id)}
            {...it}
            {...props}
          />
        ))}
      </ListWrapper>
    </View>
  );
};

const styles = {
  view: tw.style('flex-1'),
};

const Wrapper = observer(GoalsScreen);
export { Wrapper as GoalsScreen };
