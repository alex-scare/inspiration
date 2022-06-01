import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { Text, View } from '@app/components';

export const ModalScreen = () => {
  return (
    <View position="center">
      <Text variant="title">Modal</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};
