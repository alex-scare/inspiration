import React from 'react';

import { Divider, Text, View } from '@app/components';
import { observer } from 'mobx-react-lite';
import { Goal, useGoalsStore } from '@app/core';
import { List, ListItem } from '@ui-kitten/components';

const GoalsScreen = () => {
  const { goalsList } = useGoalsStore();

  return (
    <View>
      <Text variant="title">Tab Two</Text>
      <Divider />

      <List<Goal> data={goalsList} renderItem={(el) => <ListItem title={el.item.title} />} />

      {/*{goalsList.map((it) => (*/}
      {/*  <ListItem key={it.id} title={it.title} />*/}
      {/*))}*/}
    </View>
  );
};

const Wrapper = observer(GoalsScreen);
export { Wrapper as GoalsScreen };
