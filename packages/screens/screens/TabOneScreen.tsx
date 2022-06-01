import React from 'react';
import { Button } from 'react-native';

import { Divider, Text, View } from '@app/components';
import { TabScreenProps } from '../Navigator.types';
import { useSettingsStore } from '@app/core';
import { observer } from 'mobx-react-lite';

const TabOneScreen = ({ navigation }: TabScreenProps<'TabOne'>) => {
  const store2 = useSettingsStore();

  return (
    <View position="center">
      <Text variant="title">{store2.counter}</Text>
      <Button title="Increment number" onPress={store2.incrementCounter} />
      <Divider />
    </View>
  );
};

const Wrapper = observer(TabOneScreen);
export { Wrapper as TabOneScreen };
