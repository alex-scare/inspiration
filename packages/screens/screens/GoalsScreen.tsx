import React from 'react';

import { Icon, View, ListItem, SwipeWrapper, Divider, IconSources, Text } from '@app/components';
import { useGoalsStore } from '@app/core';
import tw from 'tailwind-react-native-classnames';
import { ScrollView } from 'react-native';
import { TabScreenProps } from '../Navigator.types';
import { observer } from 'mobx-react-lite';

const GoalsScreen = ({ navigation }: TabScreenProps<'Goals'>) => {
  const { goalsList, removeGoal } = useGoalsStore();

  return (
    <View style={styles.view}>
      <ScrollView style={styles.container}>
        <View style={styles.list}>
          {goalsList.map((it, i) => {
            const [source, name] = it.icon.split('.');
            return (
              <React.Fragment key={it.id}>
                {i > 0 && <Divider style={styles.divider} />}
                <SwipeWrapper
                  leftSwipe={{
                    action: () => navigation.navigate('Goal', { mode: 'update', id: it.id }),
                    Icon: <Icon source="FA" name="edit" />,
                    style: tw.style('bg-yellow-700'),
                  }}
                  rightSwipe={{
                    action: () => removeGoal(it.id),
                    Icon: <Icon source="FA" name="trash" />,
                    style: tw.style('bg-red-800'),
                  }}
                >
                  <ListItem
                    left={
                      <Icon
                        source={source as IconSources}
                        name={name}
                        viewStyle={styles.iconView}
                      />
                    }
                    title={it.title}
                    right={<Text>{it.power}</Text>}
                  />
                </SwipeWrapper>
              </React.Fragment>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  view: tw.style('flex-1'),
  divider: tw.style('h-1 bg-transparent m-0'),
  container: tw.style('flex'),
  list: tw.style('rounded-md m-3 overflow-hidden'),
  iconView: tw.style('w-8'),
};

const Wrapper = observer(GoalsScreen);
export { Wrapper as GoalsScreen };
