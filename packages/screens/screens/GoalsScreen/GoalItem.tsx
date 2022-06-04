import React, { useMemo } from 'react';
import { Divider, Icon, IconSources, ListItem, SwipeWrapper, Text } from '@app/components';
import tw from 'tailwind-react-native-classnames';
import { Goal, useGoalsStore } from '@app/core';
import { TabScreenProps } from '../../Navigator.types';

interface GoalItemProps extends TabScreenProps<'Goals'> {
  goal: Goal;
  divider: boolean;
}

const GoalItem: React.VFC<GoalItemProps> = ({ goal, divider, navigation }) => {
  const { removeGoal } = useGoalsStore();
  const [source, name] = goal.icon.split('.');

  const swipes = useMemo(
    () => ({
      leftSwipe: {
        action: () => navigation.navigate('Goal', { mode: 'update', id: goal.id }),
        Icon: <Icon source="FA" name="edit" />,
        style: tw.style('bg-yellow-700'),
      },
      rightSwipe: {
        action: () => removeGoal(goal.id),
        Icon: <Icon source="FA" name="trash" />,
        style: tw.style('bg-red-800'),
      },
    }),
    [removeGoal, navigation, goal],
  );

  return (
    <>
      {divider && <Divider style={styles.divider} />}
      <SwipeWrapper {...swipes}>
        <ListItem
          left={<Icon source={source as IconSources} name={name} viewStyle={styles.iconView} />}
          title={goal.title}
          right={<Text>{goal.power}</Text>}
        />
      </SwipeWrapper>
    </>
  );
};

const styles = {
  divider: tw.style('h-1 bg-transparent m-0'),
  iconView: tw.style('w-8'),
};

const ComponentWrapper = React.memo(GoalItem);
export { ComponentWrapper as GoalItem };
