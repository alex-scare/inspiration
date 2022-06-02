import React from 'react';

import { Icon, SwipeWrapper, View } from '@app/components';
import { observer } from 'mobx-react-lite';
import { useGoalsStore } from '@app/core';
import { ListItem } from '@ui-kitten/components';
import tw from 'tailwind-react-native-classnames';
import { ScrollView } from 'react-native';
import { TabScreenProps } from '../Navigator.types';

const GoalsScreen = ({ navigation }: TabScreenProps<'Goals'>) => {
  const { goalsList } = useGoalsStore();

  return (
    <View style={styles.view}>
      <ScrollView style={styles.container}>
        <View style={styles.list}>
          {goalsList.map((it, i) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore fix children types
            <SwipeWrapper
              key={it.id}
              leftSwipe={{
                action: () => navigation.navigate('Goal', { mode: 'update', id: it.id }),
                Icon: <Icon name="edit" />,
                style: tw.style('bg-red-500'),
              }}
            >
              <ListItem title={it.title} style={i > 0 && styles.listItem} />
            </SwipeWrapper>
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
  listItem: tw.style('mt-0.5'),
  divider: tw.style('mx-3'),
};

const Wrapper = observer(GoalsScreen);
export { Wrapper as GoalsScreen };
