import React from 'react';
import { Button, StyleSheet } from 'react-native';

import { Text, View, EditScreenInfo } from '@app/components';
import { RootTabScreenProps } from '../Navigator.types';
import { useSettingsStore } from '@app/core';
import { observer } from 'mobx-react-lite';

const TabOneScreen = ({ navigation }: RootTabScreenProps<'TabOne'>) => {
  const store2 = useSettingsStore();

  console.log('store', store2.counter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{store2.counter}</Text>
      <Button title={'Increment number'} onPress={store2.incrementCounter} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

const Wrapper = observer(TabOneScreen);
export { Wrapper as TabOneScreen };
