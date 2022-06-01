import React from 'react';

import { Divider, Text, View } from '@app/components';
import { observer } from 'mobx-react-lite';
import { useGoalsStore } from '@app/core';

const TabTwoScreen = () => {
  const { goalsList } = useGoalsStore();

  return (
    <View position="center">
      <Text variant="title">Tab Two</Text>
      <Divider />
      {goalsList.map((it) => (
        <Text key={it.id}>{it.title}</Text>
      ))}
    </View>
  );
};

const Wrapper = observer(TabTwoScreen);
export { Wrapper as TabTwoScreen };
