import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@app/components';
import { RootStackScreenProps } from '../Navigator.types';

export function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <View position={'center'}>
      <Text variant={'title'}>{`This screen doesn't exist.`}</Text>

      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text variant={'link'}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
